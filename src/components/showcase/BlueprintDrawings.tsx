/**
 * Clean monochrome vector blueprint illustrations for hardware projects.
 * Crafted with technical schematics, dimension callouts, and architectural gridlines.
 */

export function AutoShedBlueprint({ isLight = false }: { isLight?: boolean }) {
  const strokeColor = isLight ? '#27272a' : '#e4e4e7';
  const gridColor = isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)';
  const dimColor = isLight ? '#71717a' : '#a1a1aa';
  const accentLine = isLight ? '#09090b' : '#fafafa';

  return (
    <div className={`w-full h-full relative flex items-center justify-center p-4 font-mono select-none overflow-hidden ${
      isLight ? 'bg-zinc-100 text-zinc-900' : 'bg-[#0d0d10] text-zinc-100'
    }`}>
      <svg
        viewBox="0 0 800 500"
        className="w-full h-full max-h-[380px] object-contain"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="shed-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke={gridColor} strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="800" height="500" fill="url(#shed-grid)" />

        {/* Blueprint Header */}
        <text x="36" y="44" fill={strokeColor} fontSize="12" fontWeight="700" letterSpacing="0.2em">
          SHEMATIC_DWG // AUTO_SHED_SYS
        </text>
        <text x="36" y="62" fill={dimColor} fontSize="10" letterSpacing="0.1em">
          SLIDING RETRACTABLE ROOF · RAIN & MOISTURE SENSING ARDUINO ACTUATOR
        </text>
        <text x="680" y="44" fill={dimColor} fontSize="10" textAnchor="end" letterSpacing="0.15em">
          SCALE: 1:25 · REV 04
        </text>

        {/* Ground Line */}
        <line x1="120" y1="410" x2="680" y2="410" stroke={strokeColor} strokeWidth="2" strokeDasharray="6 4" />
        <text x="120" y="428" fill={dimColor} fontSize="9">GROUND_DATUM: 0.00m</text>

        {/* Main Shed Frame (Columns & Truss) */}
        {/* Left Column */}
        <rect x="220" y="240" width="16" height="170" stroke={strokeColor} strokeWidth="2" />
        {/* Right Column */}
        <rect x="560" y="240" width="16" height="170" stroke={strokeColor} strokeWidth="2" />

        {/* Diagonal Cross Bracing */}
        <line x1="236" y1="240" x2="560" y2="410" stroke={gridColor} strokeWidth="1.5" strokeDasharray="4 4" />
        <line x1="560" y1="240" x2="236" y2="410" stroke={gridColor} strokeWidth="1.5" strokeDasharray="4 4" />

        {/* Roof Guide Rails */}
        <rect x="180" y="228" width="440" height="12" rx="2" stroke={strokeColor} strokeWidth="2" />
        <line x1="190" y1="234" x2="610" y2="234" stroke={dimColor} strokeWidth="1" strokeDasharray="4 3" />
        <text x="625" y="238" fill={dimColor} fontSize="9">GUIDE_RAIL_EXT 4.40m</text>

        {/* Sliding Roof Panel (Pitched Gable) in Active Mid-Travel */}
        <path
          d="M 280 226 L 400 150 L 520 226 Z"
          stroke={accentLine}
          strokeWidth="2.5"
          fill={isLight ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.04)'}
        />
        {/* Roller Wheels on Rail */}
        <circle cx="300" cy="228" r="5" stroke={accentLine} strokeWidth="2" />
        <circle cx="500" cy="228" r="5" stroke={accentLine} strokeWidth="2" />

        {/* Travel Arrows */}
        <path d="M 330 200 L 370 200 M 360 195 L 370 200 L 360 205" stroke={strokeColor} strokeWidth="1.5" />
        <path d="M 470 200 L 430 200 M 440 195 L 430 200 L 440 205" stroke={strokeColor} strokeWidth="1.5" />
        <text x="400" y="204" fill={strokeColor} fontSize="9" textAnchor="middle" fontWeight="bold">
          SLIDE TRAVEL &lt;---&gt;
        </text>

        {/* Rain Sensor & Cloud */}
        <path
          d="M 640 140 Q 640 120 660 120 Q 675 105 695 115 Q 715 110 725 125 Q 740 135 730 150 Q 720 160 650 160 Z"
          stroke={dimColor}
          strokeWidth="1.5"
        />
        {/* Rain Lines */}
        <line x1="655" y1="172" x2="645" y2="195" stroke={strokeColor} strokeWidth="1.5" strokeDasharray="3 3" />
        <line x1="675" y1="172" x2="665" y2="195" stroke={strokeColor} strokeWidth="1.5" strokeDasharray="3 3" />
        <line x1="695" y1="172" x2="685" y2="195" stroke={strokeColor} strokeWidth="1.5" strokeDasharray="3 3" />
        <line x1="715" y1="172" x2="705" y2="195" stroke={strokeColor} strokeWidth="1.5" strokeDasharray="3 3" />

        {/* Sensor Module */}
        <rect x="620" y="260" width="80" height="50" rx="4" stroke={strokeColor} strokeWidth="2" />
        <text x="660" y="280" fill={strokeColor} fontSize="9" textAnchor="middle" fontWeight="bold">
          RAIN SENSOR
        </text>
        <text x="660" y="296" fill={dimColor} fontSize="8" textAnchor="middle">
          ANALOG PROBE
        </text>
        <path d="M 660 260 L 660 215" stroke={strokeColor} strokeWidth="1.5" strokeDasharray="2 2" />

        {/* Microcontroller Controller Box */}
        <rect x="100" y="270" width="90" height="60" rx="4" stroke={strokeColor} strokeWidth="2" />
        <text x="145" y="295" fill={strokeColor} fontSize="9" textAnchor="middle" fontWeight="bold">
          ARDUINO MCU
        </text>
        <text x="145" y="312" fill={dimColor} fontSize="8" textAnchor="middle">
          L298N DRIVER
        </text>
        {/* Wire from MCU to Rail Motor */}
        <path d="M 190 300 H 220 V 234 H 280" stroke={strokeColor} strokeWidth="1.5" strokeDasharray="3 2" />

        {/* Dimension Lines */}
        <line x1="220" y1="440" x2="576" y2="440" stroke={dimColor} strokeWidth="1" />
        <line x1="220" y1="434" x2="220" y2="446" stroke={dimColor} strokeWidth="1" />
        <line x1="576" y1="434" x2="576" y2="446" stroke={dimColor} strokeWidth="1" />
        <text x="398" y="454" fill={dimColor} fontSize="10" textAnchor="middle">
          SPAN: 3.56 METERS
        </text>

        {/* Footer Blueprint Stamp */}
        <rect x="36" y="450" width="160" height="26" stroke={dimColor} strokeWidth="1" />
        <text x="44" y="467" fill={dimColor} fontSize="8">
          STATUS: PROTOTYPE VERIFIED
        </text>
      </svg>
    </div>
  );
}

export function DigitalKeypadLockBlueprint({ isLight = false }: { isLight?: boolean }) {
  const strokeColor = isLight ? '#27272a' : '#e4e4e7';
  const gridColor = isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)';
  const dimColor = isLight ? '#71717a' : '#a1a1aa';
  const accentColor = isLight ? '#09090b' : '#fafafa';

  const keys = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['*', '0', '#'],
  ];

  return (
    <div className={`w-full h-full relative flex items-center justify-center p-4 font-mono select-none overflow-hidden ${
      isLight ? 'bg-zinc-100 text-zinc-900' : 'bg-[#0d0d10] text-zinc-100'
    }`}>
      <svg
        viewBox="0 0 800 500"
        className="w-full h-full max-h-[380px] object-contain"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="lock-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke={gridColor} strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="800" height="500" fill="url(#lock-grid)" />

        {/* Header */}
        <text x="36" y="44" fill={strokeColor} fontSize="12" fontWeight="700" letterSpacing="0.2em">
          SCHEMATIC_DWG // KEYPAD_LOCK_SYS
        </text>
        <text x="36" y="62" fill={dimColor} fontSize="10" letterSpacing="0.1em">
          3x4 MATRIX KEYPAD · EEPROM AUTHENTICATION · 12V SOLENOID DEADBOLT
        </text>
        <text x="764" y="44" fill={dimColor} fontSize="10" textAnchor="end" letterSpacing="0.15em">
          DIAGRAM: EMBEDDED C · ATMEGA328P
        </text>

        {/* Keypad Enclosure Left */}
        <rect x="90" y="100" width="220" height="320" rx="16" stroke={strokeColor} strokeWidth="2" />
        <rect x="110" y="120" width="180" height="40" rx="4" stroke={strokeColor} strokeWidth="1.5" />
        <text x="200" y="145" fill={accentColor} fontSize="13" textAnchor="middle" fontWeight="bold" letterSpacing="0.3em">
          • • • •
        </text>

        {/* 3x4 Matrix Keys */}
        {keys.map((row, rIdx) =>
          row.map((val, cIdx) => {
            const x = 115 + cIdx * 60;
            const y = 180 + rIdx * 55;
            return (
              <g key={`${rIdx}-${cIdx}`}>
                <rect x={x} y={y} width="50" height="42" rx="6" stroke={strokeColor} strokeWidth="1.5" />
                <text x={x + 25} y={y + 26} fill={accentColor} fontSize="14" textAnchor="middle" fontWeight="bold">
                  {val}
                </text>
              </g>
            );
          })
        )}

        {/* Status Indicators */}
        <circle cx="150" cy="405" r="5" stroke={strokeColor} strokeWidth="1.5" fill="#22c55e" />
        <text x="162" y="408" fill={dimColor} fontSize="8">GRANTED</text>

        <circle cx="230" cy="405" r="5" stroke={strokeColor} strokeWidth="1.5" fill="#ef4444" />
        <text x="242" y="408" fill={dimColor} fontSize="8">DENIED</text>

        {/* Matrix Bus Line from Keypad to Controller */}
        <path
          d="M 310 240 H 400"
          stroke={strokeColor}
          strokeWidth="3"
        />
        <text x="355" y="232" fill={dimColor} fontSize="8" textAnchor="middle">
          7-PIN BUS (4R x 3C)
        </text>

        {/* Controller Chip Block in Center */}
        <rect x="400" y="150" width="160" height="200" rx="8" stroke={accentColor} strokeWidth="2" />
        <text x="480" y="185" fill={accentColor} fontSize="12" textAnchor="middle" fontWeight="bold">
          ATMEGA328P
        </text>
        <text x="480" y="202" fill={dimColor} fontSize="9" textAnchor="middle">
          16MHz CRYSTAL
        </text>

        {/* Pin Labels */}
        <text x="410" y="230" fill={dimColor} fontSize="8">D2: ROW_1</text>
        <text x="410" y="245" fill={dimColor} fontSize="8">D3: ROW_2</text>
        <text x="410" y="260" fill={dimColor} fontSize="8">D4: ROW_3</text>
        <text x="410" y="275" fill={dimColor} fontSize="8">D5: ROW_4</text>
        <text x="410" y="295" fill={dimColor} fontSize="8">D6: COL_1</text>
        <text x="410" y="310" fill={dimColor} fontSize="8">D7: COL_2</text>
        <text x="410" y="325" fill={dimColor} fontSize="8">D8: COL_3</text>

        <text x="550" y="240" fill={dimColor} fontSize="8" textAnchor="end">D9: RELAY_SIG</text>
        <text x="550" y="265" fill={dimColor} fontSize="8" textAnchor="end">D10: BUZZER</text>
        <text x="550" y="290" fill={dimColor} fontSize="8" textAnchor="end">I2C: EEPROM</text>

        {/* Relay Module */}
        <path d="M 560 236 H 610" stroke={strokeColor} strokeWidth="2" />
        <rect x="610" y="200" width="80" height="70" rx="4" stroke={strokeColor} strokeWidth="1.5" />
        <text x="650" y="225" fill={strokeColor} fontSize="9" textAnchor="middle" fontWeight="bold">
          OPTICAL RELAY
        </text>
        <text x="650" y="242" fill={dimColor} fontSize="8" textAnchor="middle">
          1-CH 5V / 10A
        </text>

        {/* 12V Solenoid Deadbolt */}
        <path d="M 690 236 H 720" stroke={strokeColor} strokeWidth="2" />
        <rect x="720" y="205" width="50" height="60" rx="4" stroke={strokeColor} strokeWidth="2" />
        {/* Plunger */}
        <rect x="740" y="185" width="10" height="20" stroke={accentColor} strokeWidth="2" />
        <text x="745" y="285" fill={strokeColor} fontSize="8" textAnchor="middle" fontWeight="bold">
          SOLENOID
        </text>
        <text x="745" y="298" fill={dimColor} fontSize="7" textAnchor="middle">
          12V DC LOCK
        </text>

        {/* Circuit Spec Notes */}
        <rect x="36" y="445" width="728" height="30" stroke={dimColor} strokeWidth="1" strokeDasharray="3 3" />
        <text x="48" y="464" fill={dimColor} fontSize="8">
          SPEC: DEBOUNCE_DELAY=50ms · EEPROM_KEY_HASH=SHA256_SALT · AUTO_LOCK_TIMEOUT=5000ms · CURRENT_DRAW_ACTIVE=480mA
        </text>
      </svg>
    </div>
  );
}

