import React, { useState, useMemo } from 'react'
import { optionsData } from './data/optionsData'
import { npcCatalogue } from './data/npcCatalogue'
import './index.css'

// Import assets
import FeatureBlockSample from './assets/FeatureBlockSample.png'
import IngameMenu from './assets/IngameMenu.png'
import SampleUnlocks from './assets/SampleUnlocks.mp4'
import ModsDirectory from './assets/ModsDirectory.png'

const FACTION_OPTION_TO_NAME = {
  enemy_faction_balak_taw:      'BalakTaw',
  enemy_faction_beast:          'Beast',
  enemy_faction_boarskin:       'Boarskin',
  enemy_faction_corrupt_cerim:  'CorruptCerim',
  enemy_faction_fungal_human:   'FungalHuman',
  enemy_faction_humanoid:       'Humanoid',
  enemy_faction_lumberjack:     'Lumberjack',
  enemy_faction_nith:           'Nith',
  enemy_faction_none:           'None',
  enemy_faction_plagued:        'Plagued',
  enemy_faction_plagued_beast:  'PlaguedBeast',
  enemy_faction_plagued_human:  'PlaguedHuman',
  enemy_faction_prisoner:       'Prisoner',
  enemy_faction_risen:          'Risen',
  enemy_faction_tanth:          'Tanth',
}

const SPAWN_TYPE_OPTION = {
  Boss:     'enemy_spawn_type_boss',
  Elite:    'enemy_spawn_type_elite',
  Giant:    'enemy_spawn_type_giant',
  Normal:   'enemy_spawn_type_normal',
  Critters: 'enemy_spawn_type_critters',
}

function App() {
  const [currentPage, setCurrentPage] = useState('about')
  const [activeTab, setActiveTab] = useState(optionsData[0].category)
  const [playerName, setPlayerName] = useState('PlayerName')
  const [options, setOptions] = useState(() => {
    const initialState = {}
    optionsData.forEach(cat => {
      cat.options.forEach(opt => {
        if (opt.name !== undefined) initialState[opt.name] = opt.default
      })
    })
    return initialState
  })

  const [blacklistedGuids, setBlacklistedGuids] = useState(new Set())
  const [blacklistExpanded, setBlacklistExpanded] = useState(false)

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
        if (opt.type === 'header') {
          yaml += `\n  # ── ${opt.label} ──\n`
          return
        }
        if (opt.dependsOn && options[opt.dependsOn] !== 1) return
        const val = options[opt.name] ?? opt.default ?? 0
        yaml += `  ${opt.name}: ${val}\n`
      })
      if (cat.category === 'Enemy Settings' && blacklistedGuids.size > 0) {
        yaml += `\n  # ── Enemy Blacklist ──\n`
        yaml += `  enemy_user_blacklist: "${[...blacklistedGuids].join(',')}"\n`
      }
      yaml += `\n`
    })

    return yaml.trim()
  }, [options, playerName, blacklistedGuids])

  const handleOptionChange = (name, value) => {
    setOptions(prev => ({ ...prev, [name]: value }))
  }

  const toggleAllDrops = () => {
    const activeCategory = optionsData.find(cat => cat.category === activeTab)
    const dropOptions = activeCategory.options
      .filter(opt => opt.name && opt.name.startsWith('replace_'))
      .map(opt => opt.name)

    const allOn = dropOptions.every(name => options[name] === 1)
    const nextVal = allOn ? 0 : 1

    const newOptions = { ...options }
    dropOptions.forEach(name => {
      newOptions[name] = nextVal
    })
    setOptions(newOptions)
  }

  const toggleEnemyBlacklist = (guid) => {
    setBlacklistedGuids(prev => {
      const next = new Set(prev)
      if (next.has(guid)) next.delete(guid)
      else next.add(guid)
      return next
    })
  }

  const toggleAllFactions = () => {
    const activeCategory = optionsData.find(cat => cat.category === activeTab)
    const factionOptions = activeCategory.options
      .filter(opt => opt.name && opt.name.startsWith('enemy_faction_'))
      .map(opt => opt.name)

    const allOn = factionOptions.every(name => options[name] === 1)
    const nextVal = allOn ? 0 : 1

    const newOptions = { ...options }
    factionOptions.forEach(name => {
      newOptions[name] = nextVal
    })
    setOptions(newOptions)
  }

  const toggleAllReplaceTypes = () => {
    const activeCategory = optionsData.find(cat => cat.category === activeTab)
    const replaceTypeOptions = activeCategory.options
      .filter(opt => opt.name && opt.name.startsWith('enemy_replace_type_'))
      .map(opt => opt.name)

    const allOn = replaceTypeOptions.every(name => options[name] === 1)
    const nextVal = allOn ? 0 : 1

    const newOptions = { ...options }
    replaceTypeOptions.forEach(name => {
      newOptions[name] = nextVal
    })
    setOptions(newOptions)
  }

  const resetEnemySettings = () => {
    const enemyCategory = optionsData.find(cat => cat.category === 'Enemy Settings')
    const newOptions = { ...options }
    enemyCategory.options.forEach(opt => {
      if (opt.name !== undefined) newOptions[opt.name] = opt.default
    })
    setOptions(newOptions)
    setBlacklistedGuids(new Set())
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

          {activeTab === 'Item Settings' && (
            <button className="category_action_btn" onClick={toggleAllDrops}>
              {activeCategory.options.filter(o => o.name && o.name.startsWith('replace_')).every(n => options[n.name] === 1)
                ? 'Disable All Drops' : 'Randomize All Drops'}
            </button>
          )}

          {activeTab === 'Enemy Settings' && (
            <div className="category_action_btn_group">
              <button className="category_action_btn" onClick={toggleAllReplaceTypes}>
                {activeCategory.options.filter(o => o.name && o.name.startsWith('enemy_replace_type_')).every(n => options[n.name] === 1)
                  ? 'Un-randomize All Units' : 'Randomize All Units'}
              </button>
              <button className="category_action_btn" onClick={toggleAllFactions}>
                {activeCategory.options.filter(o => o.name && o.name.startsWith('enemy_faction_')).every(n => options[n.name] === 1)
                  ? 'Disable All Factions' : 'Enable All Factions'}
              </button>
              <button className="category_action_btn category_action_btn--reset" onClick={resetEnemySettings}>
                Reset to Defaults
              </button>
            </div>
          )}

          <div className="option-group">
            {(() => {
              // Split options into header-delimited segments
              const segments = []
              let seg = { header: null, opts: [] }
              activeCategory.options.forEach(opt => {
                if (opt.type === 'header') {
                  if (seg.header !== null || seg.opts.length > 0) segments.push(seg)
                  seg = { header: opt, opts: [] }
                } else {
                  seg.opts.push(opt)
                }
              })
              if (seg.header !== null || seg.opts.length > 0) segments.push(seg)

              return segments.map((s, si) => {
                const visibleOpts = s.opts.filter(opt => !opt.dependsOn || options[opt.dependsOn] === 1)

                return (
                  <React.Fragment key={`seg-${si}`}>
                    {s.header && (
                      <div className="option-section-header">
                        <span>{s.header.label}</span>
                        {s.header.description && <span className="option-desc">{s.header.description}</span>}
                      </div>
                    )}
                    {s.header?.gridMode
                      ? visibleOpts.length > 0 && (
                        <div className="item-toggle-grid">
                          {visibleOpts.map(opt => (
                            <button
                              key={opt.name}
                              className={`item-toggle-btn ${options[opt.name] === 1 ? 'active' : ''}`}
                              onClick={() => handleOptionChange(opt.name, options[opt.name] === 1 ? 0 : 1)}
                              title={opt.label}
                            >
                              {opt.shortLabel || opt.label}
                            </button>
                          ))}
                        </div>
                      )
                      : visibleOpts.map(opt => (
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
                          {opt.description && <span className="option-desc">{opt.description}</span>}
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
                      ))
                    }
                  </React.Fragment>
                )
              })
            })()}
          </div>

          {activeTab === 'Enemy Settings' && (
            <div className="blacklist-section">
              <div className="blacklist-header" onClick={() => setBlacklistExpanded(x => !x)}>
                <span>{blacklistExpanded ? '▲' : '▼'} Unit Blacklist</span>
                <span className="blacklist-count">
                  {blacklistedGuids.size > 0 ? `${blacklistedGuids.size} blacklisted` : 'none blacklisted'}
                </span>
                {blacklistedGuids.size > 0 && (
                  <button
                    className="blacklist-clear-btn"
                    onClick={(e) => { e.stopPropagation(); setBlacklistedGuids(new Set()) }}
                  >
                    Allow All
                  </button>
                )}
              </div>
              {blacklistExpanded && (() => {
                // Enabled factions from faction filter toggles; empty set = all allowed
                const enabledFactions = new Set(
                  Object.entries(FACTION_OPTION_TO_NAME)
                    .filter(([key]) => options[key] === 1)
                    .map(([, name]) => name)
                )
                const factionFilterActive = enabledFactions.size > 0
                const isEligible = (enemy) => {
                  if (!factionFilterActive) return true
                  return enemy.faction.split(',').map(f => f.trim()).some(f => enabledFactions.has(f))
                }

                const groups = ['Boss', 'Elite', 'Giant', 'Normal', 'Critters']
                  .filter(type => options[SPAWN_TYPE_OPTION[type]] === 1)
                  .map(type => ({ type, enemies: npcCatalogue[type].filter(isEligible) }))
                  .filter(g => g.enemies.length > 0)

                return (
                  <div className="blacklist-content">
                    {groups.length === 0
                      ? <span className="option-desc">No eligible enemies match the current spawn pool settings.</span>
                      : groups.map(({ type, enemies }) => (
                        <div key={type} className="blacklist-type-group">
                          <div className="blacklist-type-header">
                            {type} <span className="blacklist-type-count">({enemies.length})</span>
                          </div>
                          <div className="blacklist-grid">
                            {enemies.map(enemy => (
                              <button
                                key={enemy.guid}
                                className={`blacklist-enemy-btn ${blacklistedGuids.has(enemy.guid) ? 'blacklisted' : ''}`}
                                onClick={() => toggleEnemyBlacklist(enemy.guid)}
                                title={`Faction: ${enemy.faction}`}
                              >
                                {enemy.name}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))
                    }
                  </div>
                )
              })()}
            </div>
          )}
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
