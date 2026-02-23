import React, { useState, useEffect, useMemo } from 'react'
import { optionsData } from './data/optionsData'
import './index.css'

function App() {
  // Version 0.1.0 - Triggering Deployment
  const [activeTab, setActiveTab] = useState(optionsData[0].category)
  const [playerName, setPlayerName] = useState('TestPlayer')
  const [options, setOptions] = useState(() => {
    const initialState = {}
    optionsData.forEach(cat => {
      cat.options.forEach(opt => {
        initialState[opt.name] = opt.default
      })
    })
    return initialState
  })

  const yamlPreview = useMemo(() => {
    let yaml = `# ─── No Rest For The Wicked — Archipelago Player Config ───\n\n`
    yaml += `name: ${playerName}\n`
    yaml += `game: No Rest For The Wicked\n`
    yaml += `requires:\n  version: 0.5.0\n\n`
    yaml += `No Rest For The Wicked:\n`

    optionsData.forEach(cat => {
      yaml += `  # ─── ${cat.category} ───\n`
      cat.options.forEach(opt => {
        const val = options[opt.name]
        yaml += `  ${opt.name}: ${val}\n`
      })
      yaml += `\n`
    })

    return yaml.trim()
  }, [options, playerName])

  const handleOptionChange = (name, value) => {
    setOptions(prev => ({ ...prev, [name]: value }))
  }

  const toggleAllDrops = () => {
    const dropOptions = activeCategory.options
      .filter(opt => opt.name.startsWith('replace_'))
      .map(opt => opt.name)

    const allOn = dropOptions.every(name => options[name] === 1)
    const nextVal = allOn ? 0 : 1

    const newOptions = { ...options }
    dropOptions.forEach(name => {
      newOptions[name] = nextVal
    })
    setOptions(newOptions)
  }

  const downloadYaml = () => {
    const blob = new Blob([yamlPreview], { type: 'text/yaml' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${playerName}.yaml`
    a.click()
    URL.revokeObjectURL(url)
  }

  const activeCategory = optionsData.find(cat => cat.category === activeTab)

  return (
    <div id="root">
      <header>
        <h1>NRFTW YAML Generator</h1>
        <p>Configure your No Rest For The Wicked Archipelago experience</p>
      </header>

      <div className="app-container">
        <div className="settings-panel">
          <input
            type="text"
            className="username-input"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Player Name"
          />

          <div className="tabs">
            {optionsData.map(cat => (
              <button
                key={cat.category}
                className={`tab-btn ${activeTab === cat.category ? 'active' : ''}`}
                onClick={() => setActiveTab(cat.category)}
              >
                {cat.category}
              </button>
            ))}
          </div>

          {activeTab === 'Randomization' && (
            <button className="category_action_btn" onClick={toggleAllDrops}>
              {activeCategory.options.filter(o => o.name.startsWith('replace_')).every(n => options[n.name] === 1)
                ? 'Disable All Drops' : 'Randomize All Drops'}
            </button>
          )}

          <div className="option-group">
            {activeCategory.options.map(opt => (
              <div key={opt.name} className="option-item">
                <div className="option-header">
                  <span className="option-label">{opt.label}</span>
                  {opt.type === 'toggle' && (
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={options[opt.name] === 1}
                        onChange={(e) => handleOptionChange(opt.name, e.target.checked ? 1 : 0)}
                      />
                      <span className="slider"></span>
                    </label>
                  )}
                  {opt.type === 'range' && (
                    <span className="range-val">{options[opt.name]}</span>
                  )}
                </div>

                {opt.description && (
                  <span className="option-desc">{opt.description}</span>
                )}

                {opt.type === 'range' && (
                  <div className="range-controls">
                    <input
                      type="range"
                      min={opt.min}
                      max={opt.max}
                      value={options[opt.name]}
                      onChange={(e) => handleOptionChange(opt.name, parseInt(e.target.value, 10))}
                    />
                  </div>
                )}

                {opt.type === 'choice' && (
                  <select
                    value={options[opt.name]}
                    onChange={(e) => handleOptionChange(opt.name, e.target.value)}
                  >
                    {opt.options.map(o => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="preview-panel">
          <div className="yaml-preview">{yamlPreview}</div>
          <button className="download-btn" onClick={downloadYaml}>
            Download YAML
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
