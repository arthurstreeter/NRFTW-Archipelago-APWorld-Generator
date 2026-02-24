import React, { useState, useMemo } from 'react'
import { optionsData } from './data/optionsData'
import './index.css'

// Import assets
import FeatureBlockSample from './assets/FeatureBlockSample.png'
import IngameMenu from './assets/IngameMenu.png'
import SampleUnlocks from './assets/SampleUnlocks.mp4'
import ModsDirectory from './assets/ModsDirectory.png'

function App() {
  const [currentPage, setCurrentPage] = useState('about')
  const [activeTab, setActiveTab] = useState(optionsData[0].category)
  const [playerName, setPlayerName] = useState('PlayerName')
  const [options, setOptions] = useState(() => {
    const initialState = {}
    optionsData.forEach(cat => {
      cat.options.forEach(opt => {
        initialState[opt.name] = opt.default
      })
    })
    return initialState
  })

  // ─── YAML Logic ──────────────────────────────────────────────────────────

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
    const activeCategory = optionsData.find(cat => cat.category === activeTab)
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

  // ─── Render Components ────────────────────────────────────────────────────

  const renderAbout = () => (
    <div className="content-page">
      <div className="info-section">
        <h2>About No Rest For The Wicked Archipelago</h2>
        <p>
          The TheSchlooper's NRFTW Archipelago integration is currently in early development. This mod allows you to
          experience "No Rest For The Wicked" as part of a multiworld randomizer via Archipelago's AP World integration.
        </p>

        <h3>What's Randomized?</h3>
        <ul>
          <li><strong>Enemies</strong>: Enemies can be randomized.</li>
          <li><strong>Items</strong>: All drops can be randomized based on user preferences.</li>
          <li><strong>Abilities/Features</strong>: Swimming, Climbing, Dodging, etc., can be locked behind checks.</li>
          <li><strong>Random Spawn</strong>: Starting Point can be determined on run.</li>
          <li><strong>Progression</strong>: Shinies, Chests, Unique Enemy Kills, Parries, Harvesting, Crucible Runs, Activities, and more can trigger checks.</li>
        </ul>

        <div className="media-container">
          <img src={FeatureBlockSample} alt="Feature Lock Sample" className="media-element" />
          <p className="media-caption">Example of a world feature (Swimming) being locked until the item is found.</p>
        </div>

        <h3>Development Status</h3>
        <p>
          This is currently in a "Functional Alpha" state. Core mechanics work more or less, but balancing and new features
          are being added.
        </p>

        <div className="media-container">
          <video controls className="media-element">
            <source src={SampleUnlocks} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <p className="media-caption">Demonstration of real-time item unlocks and notifications.</p>
        </div>

        <div className="media-container">
          <img src={IngameMenu} alt="In-game Menu" className="media-element" />
          <p className="media-caption">The custom F1 Menu Screen for convenient access. FastTravel Menu WIP.</p>
        </div>
      </div>
    </div>
  )

  const renderSetup = () => (
    <div className="content-page">
      <div className="info-section">
        <h2>Client Setup Guide</h2>
        <p>Follow these steps to get your NRFTW Archipelago run started:</p>

        <ol>
          <li>
            <strong>Download Mod</strong>: Grab the latest NRFTW Randomizer Mod from
            <a href="https://www.nexusmods.com/norestforthewicked/mods/33" className="link-button">Nexus Mods</a>.
          </li>
          <li>
            <strong>Add Archipelago DLL</strong>: Download Archipelago.Multiclient.Net.dll v6.7.0 from <a href="https://www.nexusmods.com/norestforthewicked/mods/33" className="link-button">Nexus Mods</a> or compile it yourself from <a href="https://github.com/ArchipelagoMW/ArchipelagoMulticlient.Net" className="link-button">GitHub</a>.
          </li>
          <li>
            <strong>Generate Configuration</strong>: Use the Generator tab on this site to create your YAML file.
          </li>
          <li>
            <strong>Send your YAML To Host</strong>: They will add it to their server.
          </li>
          <li>
            <strong>Create AP Config file</strong>: Create a new AP config file in the GameDir/Mods folder, next to the other DLLs, named <span className="code-text">archipelago_config.json</span>

            <p>Sample JSON Config:</p>
            <pre className="code-text" style={{ textAlign: 'left', padding: '10px', borderRadius: '5px' }}>
              {`{
  "host": "127.0.0.1:42069",
  "slot_name": "TheSchlooper",
  "password": "",
  "auto_connect": true
}`}
            </pre>
            <div className="media-container">
              <img src={ModsDirectory} alt="Mods Directory" className="media-element" style={{ width: '50%', height: '50%', objectFit: 'contain', margin: 'auto' }} />
              <p className="media-caption">The mods directory with the Archipelago config file.</p>
            </div>
          </li>
          <li>
            <strong>Run the mod</strong>: Run the mod and enjoy!
          </li>
        </ol>

        <h2>General Tips on Generating a Run</h2>
        <ul>
          <li>
            You'll need tools for Harvesting checks, so I'd advise you
            <span className="highlight"> not to randomize Tool spawns</span>.
          </li>

          <li>
            Due to the nature of item randomization, don't expect to grind through crafting/city building.
            Unless you wish to do that, expect a longer playthrough! Reduced crafting costs may be added in the future.
          </li>

          <li>
            There are currently filler items added if necessary, such as
            <strong> Plague Ichor</strong> and certain <strong>Embers</strong> for modifying gear.
          </li>

          <li>
            An <span className="highlight">XP Multiplier</span> will help greatly when getting randomized gear,
            especially if you choose higher-tier items to spawn.
          </li>

          <li>
            If you become hard-locked, press <span className="highlight"><strong>F11</strong></span> to teleport to a needed location.
            <span className="highlight"> Be careful</span> — this opens a debug menu from the WickedRandomizer mod
            and may allow you to skip Archipelago checks.
          </li>

          <li>
            Is it required to start a new character? <strong>No.</strong><br />
            Is it more fun? <strong>Yes.</strong>
          </li>

          <li>
            <span className="highlight">Please start a new Realm!</span> This is highly suggested.
          </li>
        </ul>

        <div className="divider"></div>

        <h2>Server Setup Guide</h2>
        <p>Follow these steps to get your NRFTW Archipelago Server started:</p>

        <ol>
          <li>
            <strong>Download APWorld File</strong>: Download the latest NRFTW APWorld file from <a href="https://github.com/arthurstreeter/NRFTW-Archipelago-APWorld-Generator/blob/main/APWorld/nrftw.apworld" className="link-button">Here</a>.
          </li>
          <li>
            <strong>Add APWorld to Archipelago</strong>: This has been tested with Archipelago 0.6.6+
          </li>
          <li>
            <strong>Generate World</strong>: Place Player YAML files in your <span className="code-text">..\Archipelago\Players</span> folder and Generate the world.
          </li>
          <li>
            <strong>Host World</strong>: Either host it locally, or upload it to <a href="https://archipelago.gg/uploads" className="link-button">Archipelago.gg</a> and have them host!
          </li>
        </ol>

        <p>Need help? Check the Discord link in the Help tab.</p>
      </div>
    </div>
  )

  const renderHelp = () => (
    <div className="content-page">
      <div className="info-section">
        <h2>Help & Community</h2>
        <p>
          Join our community to report bugs, suggest features, or find other players for multiworld runs!
        </p>

        <a href="https://discord.gg/archipelago" className="link-button">Join Archipelago Discord</a>

        <h3>Future Plans</h3>
        <ul>
          <li>Enhanced Item Randomization weights.</li>
          <li>Custom Area/Region logic.</li>
          <li>Integration with more in-game systems (Housing, Crafting, Custom Boons, Plague, etc...).</li>
          <li>More Polish!</li>
        </ul>

        <h3>How You Can Help</h3>
        <p>
          We are looking for testers! Play the APWorld, find bugs, and share your feedback in the discord channel.
          <br /> Thoughts on tracked events and template runs are welcome!
        </p>
      </div>
    </div>
  )

  const renderGenerator = () => {
    const activeCategory = optionsData.find(cat => cat.category === activeTab)
    return (
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
    )
  }

  // ─── Main Render ──────────────────────────────────────────────────────────

  return (
    <div id="root">
      <nav className="nav-bar">
        <button
          className={`nav-link ${currentPage === 'about' ? 'active' : ''}`}
          onClick={() => setCurrentPage('about')}
        >
          About
        </button>
        <button
          className={`nav-link ${currentPage === 'setup' ? 'active' : ''}`}
          onClick={() => setCurrentPage('setup')}
        >
          Setup
        </button>
        <button
          className={`nav-link ${currentPage === 'generator' ? 'active' : ''}`}
          onClick={() => setCurrentPage('generator')}
        >
          YAML Generator
        </button>
        <button
          className={`nav-link ${currentPage === 'help' ? 'active' : ''}`}
          onClick={() => setCurrentPage('help')}
        >
          Help
        </button>
      </nav>

      <header>
        <h1>
          Wicked Archipelago</h1>
        <p>No Rest For The Wicked Multiworld Randomizer</p>
      </header>

      <main className="main-content">
        {currentPage === 'about' && renderAbout()}
        {currentPage === 'setup' && renderSetup()}
        {currentPage === 'generator' && renderGenerator()}
        {currentPage === 'help' && renderHelp()}
      </main>
    </div>
  )
}

export default App
