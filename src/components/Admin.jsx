import { useState, useEffect, useRef, useCallback } from 'react'
import { saveCMS, clearCMS, loadCMS } from '../data/store'
import { defaultSelectedWork, defaultProofProject, defaultExperiments } from '../data/projects'

// ——— Image processing (resize + compress → data URL) ———

function processFile(file, maxW = 1600) {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = () => {
      const img = new Image()
      img.onload = () => {
        const scale = img.width > maxW ? maxW / img.width : 1
        const w = Math.round(img.width * scale)
        const h = Math.round(img.height * scale)
        const canvas = document.createElement('canvas')
        canvas.width = w
        canvas.height = h
        canvas.getContext('2d').drawImage(img, 0, 0, w, h)
        resolve(canvas.toDataURL('image/jpeg', 0.82))
      }
      img.src = reader.result
    }
    reader.readAsDataURL(file)
  })
}

function isVideoFile(file) {
  return file?.type?.startsWith('video/')
}

function isMediaFile(file) {
  return file?.type?.startsWith('image/') || isVideoFile(file)
}

function isImageFile(file) {
  return file?.type?.startsWith('image/')
}

// ——— Tiny form primitives ———

function Field({ label, value, onChange, multiline, placeholder }) {
  const shared = {
    value: value ?? '',
    onChange: (e) => onChange(e.target.value),
    placeholder,
    className: 'cms-input',
    style: { width: '100%', padding: '8px 12px', border: '1px solid #D0D0D0', borderRadius: '6px', fontFamily: "'DM Sans', sans-serif", fontSize: '14px', lineHeight: '1.6', background: '#fff', resize: multiline ? 'vertical' : undefined },
  }
  return (
    <label className="cms-field" style={{ display: 'block', marginBottom: '16px' }}>
      <span style={{ display: 'block', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: '#4C4C4C', marginBottom: '4px' }}>{label}</span>
      {multiline ? <textarea rows={4} {...shared} /> : <input type="text" {...shared} />}
    </label>
  )
}

function isVideoSrc(src) {
  if (!src) return false
  return /\.(mp4|webm|mov|ogg)(\?|$)/i.test(src) || src.startsWith('data:video/')
}

function ImageField({ label, value, onChange }) {
  const fileRef = useRef(null)
  const [dragging, setDragging] = useState(false)

  const handleFile = async (file) => {
    if (!isMediaFile(file)) return
    if (isVideoFile(file)) {
      const reader = new FileReader()
      reader.onload = () => onChange(reader.result)
      reader.readAsDataURL(file)
      return
    }
    const dataUrl = await processFile(file)
    onChange(dataUrl)
  }

  const onDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) handleFile(file)
  }

  const hasImage = value && value.length > 0

  return (
    <div style={{ marginBottom: '16px' }}>
      <span style={{ display: 'block', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: '#4C4C4C', marginBottom: '4px' }}>{label}</span>
      {hasImage ? (
        <div style={{ position: 'relative', display: 'inline-block' }}>
          {isVideoSrc(value) ? (
            <video src={value} autoPlay muted loop playsInline style={{ maxWidth: '100%', maxHeight: '180px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #D0D0D0', display: 'block' }} />
          ) : (
            <img src={value} alt="Preview" style={{ maxWidth: '100%', maxHeight: '180px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #D0D0D0', display: 'block' }} onError={(e) => { e.target.style.display = 'none' }} />
          )}
          <div style={{ display: 'flex', gap: '6px', marginTop: '6px' }}>
            <button type="button" onClick={() => fileRef.current?.click()} style={btnSmall}>Replace</button>
            <button type="button" onClick={() => onChange('')} style={{ ...btnSmall, color: '#c00' }}>Remove</button>
          </div>
        </div>
      ) : (
        <div
          onClick={() => fileRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          style={{ border: `2px dashed ${dragging ? '#000' : '#D0D0D0'}`, borderRadius: '8px', padding: '24px', textAlign: 'center', cursor: 'pointer', background: dragging ? '#f0f0f0' : '#FAFAFA', transition: 'all 0.15s ease' }}
        >
          <p style={{ fontSize: '13px', color: '#4C4C4C', margin: 0 }}>Drop image or video here, or <span style={{ textDecoration: 'underline' }}>browse</span></p>
          <p style={{ fontSize: '11px', color: '#9B9B9B', margin: '4px 0 0' }}>Supports images + MP4/WebM. Or paste a URL below</p>
        </div>
      )}
      <input ref={fileRef} type="file" accept="image/*,video/mp4,video/webm,video/quicktime" style={{ display: 'none' }} onChange={(e) => { if (e.target.files?.[0]) handleFile(e.target.files[0]); e.target.value = '' }} />
      <input
        type="text" value={value?.startsWith('data:') ? '' : (value ?? '')}
        onChange={(e) => onChange(e.target.value)}
        placeholder="or paste image URL"
        style={{ width: '100%', padding: '6px 10px', border: '1px solid #D0D0D0', borderRadius: '6px', fontFamily: "'DM Sans', sans-serif", fontSize: '12px', background: '#fff', marginTop: '6px', color: '#4C4C4C' }}
      />
    </div>
  )
}

function ImageArrayField({ label, value = [], onChange }) {
  const fileRefs = useRef({})
  const remove = (i) => onChange(value.filter((_, j) => j !== i))
  const update = (i, v) => { const next = [...value]; next[i] = v; onChange(next) }

  const handleFile = async (i, file) => {
    if (!isImageFile(file)) return
    const dataUrl = await processFile(file)
    update(i, dataUrl)
  }

  const addFromFiles = async (files) => {
    const newUrls = []
    for (const file of files) {
      if (isImageFile(file)) {
        newUrls.push(await processFile(file))
      }
    }
    if (newUrls.length) onChange([...value, ...newUrls])
  }

  const onDropZone = (e) => {
    e.preventDefault()
    if (e.dataTransfer.files?.length) addFromFiles([...e.dataTransfer.files])
  }

  return (
    <div style={{ marginBottom: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <span style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: '#4C4C4C' }}>{label}</span>
      </div>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '8px' }}>
        {value.map((url, i) => (
          <div key={i} style={{ position: 'relative', width: '100px', flexShrink: 0 }}>
            {url ? (
              <img src={url} alt="" style={{ width: '100px', height: '70px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #D0D0D0', display: 'block' }} onError={(e) => { e.target.style.opacity = '0.3' }} />
            ) : (
              <div
                onClick={() => fileRefs.current[i]?.click()}
                style={{ width: '100px', height: '70px', border: '2px dashed #D0D0D0', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '11px', color: '#9B9B9B' }}
              >
                + image
              </div>
            )}
            <div style={{ display: 'flex', gap: '2px', marginTop: '4px' }}>
              <button type="button" onClick={() => fileRefs.current[i]?.click()} style={{ ...btnSmall, fontSize: '10px', padding: '1px 4px' }}>{url ? 'swap' : 'pick'}</button>
              <button type="button" onClick={() => remove(i)} style={{ ...btnSmall, fontSize: '10px', padding: '1px 4px', color: '#c00' }}>x</button>
            </div>
            <input ref={(el) => { fileRefs.current[i] = el }} type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => { if (e.target.files?.[0]) handleFile(i, e.target.files[0]); e.target.value = '' }} />
          </div>
        ))}
        <div
          onClick={() => { onChange([...value, '']); }}
          onDragOver={(e) => e.preventDefault()}
          onDrop={onDropZone}
          style={{ width: '100px', height: '70px', border: '2px dashed #D0D0D0', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '20px', color: '#9B9B9B', flexShrink: 0 }}
        >
          +
        </div>
      </div>
    </div>
  )
}

function StringArrayField({ label, value = [], onChange, placeholder }) {
  const add = () => onChange([...value, ''])
  const remove = (i) => onChange(value.filter((_, j) => j !== i))
  const update = (i, v) => { const next = [...value]; next[i] = v; onChange(next) }

  return (
    <div style={{ marginBottom: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
        <span style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: '#4C4C4C' }}>{label}</span>
        <button type="button" onClick={add} style={btnSmall}>+ Add</button>
      </div>
      {value.map((str, i) => (
        <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '6px' }}>
          <input
            type="text" value={str} onChange={(e) => update(i, e.target.value)} placeholder={placeholder}
            style={{ flex: 1, padding: '6px 10px', border: '1px solid #D0D0D0', borderRadius: '6px', fontFamily: "'DM Sans', sans-serif", fontSize: '13px', background: '#fff' }}
          />
          <button type="button" onClick={() => remove(i)} style={{ ...btnSmall, color: '#c00' }}>x</button>
        </div>
      ))}
    </div>
  )
}

function Section({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div style={{ borderTop: '1px solid #D0D0D0', marginBottom: '8px' }}>
      <button
        type="button" onClick={() => setOpen(!open)}
        style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontSize: '14px', fontWeight: 600, color: '#000' }}
      >
        {title}
        <span style={{ fontSize: '12px', color: '#4C4C4C' }}>{open ? '−' : '+'}</span>
      </button>
      {open && <div style={{ paddingBottom: '16px' }}>{children}</div>}
    </div>
  )
}

const btnSmall = { background: 'none', border: '1px solid #D0D0D0', borderRadius: '4px', padding: '2px 8px', fontSize: '12px', fontFamily: "'DM Sans', sans-serif", cursor: 'pointer', color: '#4C4C4C' }

// ——— Block types ———

const BLOCK_TYPES = [
  { type: 'text', label: 'Text' },
  { type: 'image', label: 'Full Image' },
  { type: 'text-image', label: 'Text + Image' },
  { type: 'image-grid', label: 'Image Grid' },
  { type: 'list', label: 'Numbered List' },
  { type: 'cards', label: 'Cards' },
  { type: 'metrics', label: 'Metrics' },
  { type: 'embed', label: 'Embed (Figma / Video)' },
]

const emptyBlocks = {
  'text': { type: 'text', number: '', title: '', text: '' },
  'image': { type: 'image', number: '', title: '', src: '', caption: '' },
  'text-image': { type: 'text-image', number: '', title: '', text: '', image: '' },
  'image-grid': { type: 'image-grid', images: [], aspect: '' },
  'list': { type: 'list', title: '', items: [] },
  'cards': { type: 'cards', number: '', title: '', items: [] },
  'metrics': { type: 'metrics', number: '', title: '', items: [] },
  'embed': { type: 'embed', number: '', title: '', url: '', caption: '', aspectRatio: '16/9' },
}

function blockLabel(block) {
  const bt = BLOCK_TYPES.find(b => b.type === block.type)
  const name = bt?.label || block.type
  const preview = block.title || block.text?.slice(0, 30) || ''
  return preview ? `${name}: ${preview}` : name
}

// ——— Block form (renders fields based on type) ———

function BlockForm({ block, onChange }) {
  const set = (key, val) => onChange({ ...block, [key]: val })

  switch (block.type) {
    case 'text':
      return <>
        <div style={{ display: 'flex', gap: '8px' }}>
          <div style={{ width: '80px' }}><Field label="Number" value={block.number} onChange={(v) => set('number', v)} placeholder="01" /></div>
          <div style={{ flex: 1 }}><Field label="Title" value={block.title} onChange={(v) => set('title', v)} /></div>
        </div>
        <Field label="Text" value={block.text} onChange={(v) => set('text', v)} multiline />
      </>

    case 'image':
      return <>
        <div style={{ display: 'flex', gap: '8px' }}>
          <div style={{ width: '80px' }}><Field label="Number" value={block.number} onChange={(v) => set('number', v)} placeholder="01" /></div>
          <div style={{ flex: 1 }}><Field label="Title" value={block.title} onChange={(v) => set('title', v)} /></div>
        </div>
        <ImageField label="Image" value={block.src} onChange={(v) => set('src', v)} />
        <Field label="Caption" value={block.caption} onChange={(v) => set('caption', v)} />
      </>

    case 'text-image':
      return <>
        <div style={{ display: 'flex', gap: '8px' }}>
          <div style={{ width: '80px' }}><Field label="Number" value={block.number} onChange={(v) => set('number', v)} placeholder="01" /></div>
          <div style={{ flex: 1 }}><Field label="Title" value={block.title} onChange={(v) => set('title', v)} /></div>
        </div>
        <Field label="Text" value={block.text} onChange={(v) => set('text', v)} multiline />
        <ImageField label="Image" value={block.image} onChange={(v) => set('image', v)} />
      </>

    case 'image-grid':
      return <>
        <ImageArrayField label="Images" value={block.images} onChange={(v) => set('images', v)} />
        <Field label="Aspect Ratio" value={block.aspect} onChange={(v) => set('aspect', v)} placeholder="4/3 or 3/4 or 1/1 (default: 4/3)" />
      </>

    case 'list':
      return <>
        <Field label="Title" value={block.title} onChange={(v) => set('title', v)} />
        <StringArrayField label="Items" value={block.items} onChange={(v) => set('items', v)} placeholder="List item" />
      </>

    case 'cards':
      return <>
        <div style={{ display: 'flex', gap: '8px' }}>
          <div style={{ width: '80px' }}><Field label="Number" value={block.number} onChange={(v) => set('number', v)} placeholder="04" /></div>
          <div style={{ flex: 1 }}><Field label="Title" value={block.title} onChange={(v) => set('title', v)} /></div>
        </div>
        <CardItemsField value={block.items} onChange={(v) => set('items', v)} />
      </>

    case 'metrics':
      return <>
        <div style={{ display: 'flex', gap: '8px' }}>
          <div style={{ width: '80px' }}><Field label="Number" value={block.number} onChange={(v) => set('number', v)} placeholder="06" /></div>
          <div style={{ flex: 1 }}><Field label="Title" value={block.title} onChange={(v) => set('title', v)} /></div>
        </div>
        <MetricItemsField value={block.items} onChange={(v) => set('items', v)} />
      </>

    case 'embed':
      return <>
        <div style={{ display: 'flex', gap: '8px' }}>
          <div style={{ width: '80px' }}><Field label="Number" value={block.number} onChange={(v) => set('number', v)} /></div>
          <div style={{ flex: 1 }}><Field label="Title" value={block.title} onChange={(v) => set('title', v)} placeholder="e.g. User Flow, Prototype" /></div>
        </div>
        <Field label="Embed URL" value={block.url} onChange={(v) => set('url', v)} placeholder="Figma prototype URL, YouTube embed, etc." />
        <Field label="Aspect Ratio" value={block.aspectRatio} onChange={(v) => set('aspectRatio', v)} placeholder="16/9" />
        <Field label="Caption" value={block.caption} onChange={(v) => set('caption', v)} />
      </>

    default: return <p style={{ color: '#c00', fontSize: '13px' }}>Unknown block type: {block.type}</p>
  }
}

function CardItemsField({ value = [], onChange }) {
  const add = () => onChange([...value, { title: '', text: '' }])
  const remove = (i) => onChange(value.filter((_, j) => j !== i))
  const update = (i, key, v) => { const next = [...value]; next[i] = { ...next[i], [key]: v }; onChange(next) }

  return (
    <div>
      {value.map((d, i) => (
        <div key={i} style={{ padding: '12px', border: '1px solid #E2E2E2', borderRadius: '6px', marginBottom: '8px', background: '#FAFAFA' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '11px', color: '#4C4C4C', fontWeight: 600 }}>Card {i + 1}</span>
            <button type="button" onClick={() => remove(i)} style={{ ...btnSmall, color: '#c00' }}>Remove</button>
          </div>
          <Field label="Title" value={d.title} onChange={(v) => update(i, 'title', v)} />
          <Field label="Description" value={d.text} onChange={(v) => update(i, 'text', v)} multiline />
        </div>
      ))}
      <button type="button" onClick={add} style={{ ...btnSmall, marginTop: '4px' }}>+ Add Card</button>
    </div>
  )
}

function MetricItemsField({ value = [], onChange }) {
  const add = () => onChange([...value, { metric: '', label: '', note: '' }])
  const remove = (i) => onChange(value.filter((_, j) => j !== i))
  const update = (i, key, v) => { const next = [...value]; next[i] = { ...next[i], [key]: v }; onChange(next) }

  return (
    <div>
      {value.map((r, i) => (
        <div key={i} style={{ padding: '12px', border: '1px solid #E2E2E2', borderRadius: '6px', marginBottom: '8px', background: '#FAFAFA' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '11px', color: '#4C4C4C', fontWeight: 600 }}>Metric {i + 1}</span>
            <button type="button" onClick={() => remove(i)} style={{ ...btnSmall, color: '#c00' }}>Remove</button>
          </div>
          <Field label="Metric" value={r.metric} onChange={(v) => update(i, 'metric', v)} placeholder="e.g. +40%" />
          <Field label="Label" value={r.label} onChange={(v) => update(i, 'label', v)} placeholder="e.g. Trust score" />
          <Field label="Note" value={r.note} onChange={(v) => update(i, 'note', v)} placeholder="e.g. vs. baseline" />
        </div>
      ))}
      <button type="button" onClick={add} style={{ ...btnSmall, marginTop: '4px' }}>+ Add Metric</button>
    </div>
  )
}

// ——— Block list editor (add, remove, reorder) ———

function BlockListEditor({ blocks = [], onChange }) {
  const [addingBlock, setAddingBlock] = useState(false)

  const updateBlock = (i, block) => { const next = [...blocks]; next[i] = block; onChange(next) }
  const removeBlock = (i) => onChange(blocks.filter((_, j) => j !== i))
  const moveBlock = (i, dir) => {
    const next = [...blocks]
    const target = i + dir
    if (target < 0 || target >= next.length) return
    ;[next[i], next[target]] = [next[target], next[i]]
    onChange(next)
  }
  const addBlock = (type) => {
    onChange([...blocks, structuredClone(emptyBlocks[type])])
    setAddingBlock(false)
  }

  return (
    <div>
      {blocks.map((block, i) => (
        <div key={i} style={{ border: '1px solid #D0D0D0', borderRadius: '8px', marginBottom: '12px', background: '#fff' }}>
          <Section title={
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%' }}>
              <span style={{ fontSize: '10px', color: '#9B9B9B', background: '#F0F0F0', padding: '1px 6px', borderRadius: '3px', textTransform: 'uppercase' }}>{block.type}</span>
              <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{block.title || block.text?.slice(0, 40) || '(empty)'}</span>
            </span>
          }>
            <div style={{ padding: '0 12px 12px' }}>
              <BlockForm block={block} onChange={(b) => updateBlock(i, b)} />
              <div style={{ display: 'flex', gap: '6px', marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #E2E2E2' }}>
                <button type="button" onClick={() => moveBlock(i, -1)} disabled={i === 0} style={{ ...btnSmall, opacity: i === 0 ? 0.3 : 1 }}>Move up</button>
                <button type="button" onClick={() => moveBlock(i, 1)} disabled={i === blocks.length - 1} style={{ ...btnSmall, opacity: i === blocks.length - 1 ? 0.3 : 1 }}>Move down</button>
                <button type="button" onClick={() => removeBlock(i)} style={{ ...btnSmall, color: '#c00', marginLeft: 'auto' }}>Remove block</button>
              </div>
            </div>
          </Section>
        </div>
      ))}

      {addingBlock ? (
        <div style={{ border: '1px solid #D0D0D0', borderRadius: '8px', padding: '16px', background: '#fff' }}>
          <p style={{ fontSize: '13px', fontWeight: 600, marginBottom: '12px' }}>Add a block:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {BLOCK_TYPES.map((bt) => (
              <button key={bt.type} type="button" onClick={() => addBlock(bt.type)} style={{ ...btnSmall, padding: '6px 12px' }}>{bt.label}</button>
            ))}
          </div>
          <button type="button" onClick={() => setAddingBlock(false)} style={{ ...btnSmall, marginTop: '12px', color: '#4C4C4C' }}>Cancel</button>
        </div>
      ) : (
        <button type="button" onClick={() => setAddingBlock(true)} style={{ width: '100%', padding: '12px', border: '2px dashed #D0D0D0', borderRadius: '8px', background: 'none', fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: '#4C4C4C', cursor: 'pointer' }}>+ Add block</button>
      )}
    </div>
  )
}

// ——— Project form (blocks-based) ———

function ProjectForm({ project, onChange }) {
  const set = (key, val) => onChange({ ...project, [key]: val })
  const setMeta = (key, val) => onChange({ ...project, meta: { ...project.meta, [key]: val } })

  return (
    <div>
      <Section title="Basic Info" defaultOpen>
        <Field label="Title" value={project.title} onChange={(v) => set('title', v)} />
        <Field label="Subtitle" value={project.subtitle} onChange={(v) => set('subtitle', v)} />
        <Field label="Slug" value={project.slug} onChange={(v) => set('slug', v)} placeholder="url-friendly-name" />
        <StringArrayField label="Tags" value={project.tags} onChange={(v) => set('tags', v)} placeholder="Tag" />
        <ImageField label="Thumbnail" value={project.thumbnail} onChange={(v) => set('thumbnail', v)} />
        <ImageField label="Hero Image" value={project.hero} onChange={(v) => set('hero', v)} />
      </Section>

      <Section title="Meta">
        <Field label="Role" value={project.meta?.role} onChange={(v) => setMeta('role', v)} />
        <Field label="Duration" value={project.meta?.duration} onChange={(v) => setMeta('duration', v)} />
        <Field label="Team" value={project.meta?.team} onChange={(v) => setMeta('team', v)} />
        <Field label="Tools" value={project.meta?.tools} onChange={(v) => setMeta('tools', v)} />
      </Section>

      <div style={{ marginTop: '24px' }}>
        <p style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: '#4C4C4C', marginBottom: '16px' }}>Content Blocks</p>
        <BlockListEditor blocks={project.blocks || []} onChange={(blocks) => set('blocks', blocks)} />
      </div>
    </div>
  )
}

// ——— Proof form ———

function ProofForm({ data, onChange }) {
  const set = (key, val) => onChange({ ...data, [key]: val })
  return (
    <div>
      <Section title="Basic Info" defaultOpen>
        <Field label="Title" value={data.title} onChange={(v) => set('title', v)} />
        <Field label="Subtitle" value={data.subtitle} onChange={(v) => set('subtitle', v)} />
        <Field label="Slug" value={data.slug} onChange={(v) => set('slug', v)} />
        <StringArrayField label="Tags" value={data.tags} onChange={(v) => set('tags', v)} placeholder="Tag" />
        <ImageField label="Thumbnail" value={data.thumbnail} onChange={(v) => set('thumbnail', v)} />
        <ImageField label="Hero Image" value={data.hero} onChange={(v) => set('hero', v)} />
      </Section>
      <Section title="Content" defaultOpen>
        <Field label="Problem" value={data.problem} onChange={(v) => set('problem', v)} multiline />
        <Field label="Insight" value={data.insight} onChange={(v) => set('insight', v)} multiline />
        <Field label="Outcome" value={data.outcome} onChange={(v) => set('outcome', v)} multiline />
        <ImageArrayField label="Screens" value={data.screens} onChange={(v) => set('screens', v)} />
      </Section>
    </div>
  )
}

// ——— Experiment form ———

function ExperimentForm({ data, onChange }) {
  const set = (key, val) => onChange({ ...data, [key]: val })
  return (
    <div>
      <Field label="Title" value={data.title} onChange={(v) => set('title', v)} />
      <StringArrayField label="Tags" value={data.tags} onChange={(v) => set('tags', v)} placeholder="Tag" />
      <ImageField label="Image" value={data.image} onChange={(v) => set('image', v)} />
      <Field label="Description" value={data.description} onChange={(v) => set('description', v)} multiline />
    </div>
  )
}

// ——— Empty templates ———

const emptyProject = {
  slug: '', title: '', subtitle: '', tags: [], thumbnail: '', hero: '',
  meta: { role: '', duration: '', team: '', tools: '' },
  blocks: [],
}

const emptyExperiment = { title: '', tags: [], image: '', description: '' }

// ——— Main admin ———

export default function Admin() {
  const [data, setData] = useState(() => {
    const cms = loadCMS()
    return {
      selectedWork: cms?.selectedWork ?? structuredClone(defaultSelectedWork),
      proofProject: cms?.proofProject ?? structuredClone(defaultProofProject),
      experiments: cms?.experiments ?? structuredClone(defaultExperiments),
    }
  })
  const [tab, setTab] = useState('work')
  const [projectIdx, setProjectIdx] = useState(0)
  const [expIdx, setExpIdx] = useState(0)
  const [saveStatus, setSaveStatus] = useState('saved')
  const saveTimer = useRef(null)
  const fileInputRef = useRef(null)

  // Auto-save with 500ms debounce
  const schedSave = useCallback((newData) => {
    setSaveStatus('unsaved')
    clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(() => {
      saveCMS(newData)
      setSaveStatus('saved')
    }, 500)
  }, [])

  const updateData = useCallback((updater) => {
    setData((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater
      schedSave(next)
      return next
    })
  }, [schedSave])

  // Project CRUD
  const updateProject = (idx, project) => {
    updateData((prev) => {
      const next = structuredClone(prev)
      next.selectedWork[idx] = project
      return next
    })
  }
  const addProject = () => {
    updateData((prev) => {
      const next = structuredClone(prev)
      next.selectedWork.push(structuredClone(emptyProject))
      return next
    })
    setProjectIdx(data.selectedWork.length)
  }
  const removeProject = (idx) => {
    if (!confirm(`Delete "${data.selectedWork[idx]?.title || 'Untitled'}"?`)) return
    updateData((prev) => {
      const next = structuredClone(prev)
      next.selectedWork.splice(idx, 1)
      return next
    })
    setProjectIdx(Math.max(0, projectIdx - 1))
  }

  // Experiment CRUD
  const updateExperiment = (idx, exp) => {
    updateData((prev) => {
      const next = structuredClone(prev)
      next.experiments[idx] = exp
      return next
    })
  }
  const addExperiment = () => {
    updateData((prev) => {
      const next = structuredClone(prev)
      next.experiments.push(structuredClone(emptyExperiment))
      return next
    })
    setExpIdx(data.experiments.length)
  }
  const removeExperiment = (idx) => {
    if (!confirm(`Delete "${data.experiments[idx]?.title || 'Untitled'}"?`)) return
    updateData((prev) => {
      const next = structuredClone(prev)
      next.experiments.splice(idx, 1)
      return next
    })
    setExpIdx(Math.max(0, expIdx - 1))
  }

  // Export / Import / Reset
  const handleExport = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'portfolio-content.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleImport = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const imported = JSON.parse(reader.result)
        if (imported.selectedWork && imported.proofProject && imported.experiments) {
          setData(imported)
          saveCMS(imported)
          setSaveStatus('saved')
        } else {
          alert('Invalid JSON structure. Needs selectedWork, proofProject, and experiments.')
        }
      } catch { alert('Failed to parse JSON file.') }
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  const handleReset = () => {
    if (!confirm('Reset all content to defaults? This will erase your edits.')) return
    const fresh = {
      selectedWork: structuredClone(defaultSelectedWork),
      proofProject: structuredClone(defaultProofProject),
      experiments: structuredClone(defaultExperiments),
    }
    setData(fresh)
    clearCMS()
    setSaveStatus('saved')
  }

  const currentProject = data.selectedWork[projectIdx]
  const currentExp = data.experiments[expIdx]

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", minHeight: '100vh', background: '#F7F7F7' }}>
      {/* ——— Top bar ——— */}
      <div style={{ position: 'sticky', top: 0, zIndex: 50, background: '#fff', borderBottom: '1px solid #D0D0D0', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '22px', letterSpacing: '1px' }}>PORTFOLIO CMS</span>
          <span style={{ fontSize: '12px', color: saveStatus === 'saved' ? '#2a9d2a' : '#b88a00', background: saveStatus === 'saved' ? '#e6f9e6' : '#fff8e0', padding: '2px 8px', borderRadius: '4px' }}>
            {saveStatus === 'saved' ? 'Saved' : 'Saving...'}
          </span>
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button onClick={handleExport} style={btnAction}>Export JSON</button>
          <button onClick={() => fileInputRef.current?.click()} style={btnAction}>Import JSON</button>
          <input ref={fileInputRef} type="file" accept=".json" onChange={handleImport} style={{ display: 'none' }} />
          <button onClick={handleReset} style={{ ...btnAction, color: '#c00', borderColor: '#c00' }}>Reset</button>
          <a href="/" onClick={(e) => { e.preventDefault(); window.location.href = '/' }} style={{ ...btnAction, textDecoration: 'none', background: '#000', color: '#fff', borderColor: '#000' }}>View Site</a>
        </div>
      </div>

      {/* ——— Tabs ——— */}
      <div style={{ display: 'flex', gap: '0', borderBottom: '1px solid #D0D0D0', background: '#fff', padding: '0 24px' }}>
        {[
          { key: 'work', label: `Projects (${data.selectedWork.length})` },
          { key: 'proof', label: 'Proof of Fundamentals' },
          { key: 'experiments', label: `Experiments (${data.experiments.length})` },
        ].map((t) => (
          <button
            key={t.key} onClick={() => setTab(t.key)}
            style={{ padding: '12px 20px', background: 'none', border: 'none', borderBottom: tab === t.key ? '2px solid #000' : '2px solid transparent', fontFamily: "'DM Sans', sans-serif", fontSize: '14px', fontWeight: tab === t.key ? 600 : 400, color: tab === t.key ? '#000' : '#4C4C4C', cursor: 'pointer' }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ——— Content ——— */}
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '32px 24px' }}>

        {/* Projects tab */}
        {tab === 'work' && (
          <>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
              {data.selectedWork.map((p, i) => (
                <button
                  key={i} onClick={() => setProjectIdx(i)}
                  style={{ padding: '6px 14px', borderRadius: '20px', border: i === projectIdx ? '2px solid #000' : '1px solid #D0D0D0', background: i === projectIdx ? '#000' : '#fff', color: i === projectIdx ? '#fff' : '#000', fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontWeight: 500, cursor: 'pointer' }}
                >
                  {p.title || 'Untitled'}
                </button>
              ))}
              <button onClick={addProject} style={{ padding: '6px 14px', borderRadius: '20px', border: '1px dashed #9B9B9B', background: 'none', fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: '#4C4C4C', cursor: 'pointer' }}>+ New</button>
            </div>
            {currentProject && (
              <>
                <ProjectForm project={currentProject} onChange={(p) => updateProject(projectIdx, p)} />
                {data.selectedWork.length > 1 && (
                  <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid #D0D0D0' }}>
                    <button onClick={() => removeProject(projectIdx)} style={{ ...btnAction, color: '#c00', borderColor: '#c00' }}>Delete this project</button>
                  </div>
                )}
              </>
            )}
          </>
        )}

        {/* Proof tab */}
        {tab === 'proof' && (
          <ProofForm data={data.proofProject} onChange={(p) => updateData((prev) => ({ ...prev, proofProject: p }))} />
        )}

        {/* Experiments tab */}
        {tab === 'experiments' && (
          <>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
              {data.experiments.map((exp, i) => (
                <button
                  key={i} onClick={() => setExpIdx(i)}
                  style={{ padding: '6px 14px', borderRadius: '20px', border: i === expIdx ? '2px solid #000' : '1px solid #D0D0D0', background: i === expIdx ? '#000' : '#fff', color: i === expIdx ? '#fff' : '#000', fontFamily: "'DM Sans', sans-serif", fontSize: '13px', fontWeight: 500, cursor: 'pointer' }}
                >
                  {exp.title || 'Untitled'}
                </button>
              ))}
              <button onClick={addExperiment} style={{ padding: '6px 14px', borderRadius: '20px', border: '1px dashed #9B9B9B', background: 'none', fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: '#4C4C4C', cursor: 'pointer' }}>+ New</button>
            </div>
            {currentExp && (
              <>
                <ExperimentForm data={currentExp} onChange={(exp) => updateExperiment(expIdx, exp)} />
                {data.experiments.length > 1 && (
                  <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid #D0D0D0' }}>
                    <button onClick={() => removeExperiment(expIdx)} style={{ ...btnAction, color: '#c00', borderColor: '#c00' }}>Delete this experiment</button>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}

const btnAction = { padding: '6px 14px', borderRadius: '6px', border: '1px solid #D0D0D0', background: '#fff', fontFamily: "'DM Sans', sans-serif", fontSize: '13px', cursor: 'pointer', color: '#000', display: 'inline-flex', alignItems: 'center' }
