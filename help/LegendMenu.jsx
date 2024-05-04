
export default function LegendMenu({ title, commands }) {
  return (
    <div className="border border-dashed border-slate-700">
      <h2 className="p-2 text-sm font-semibold text-slate-50 border-b border-dashed border-slate-700">{title}</h2>
      <ul className="flex flex-col gap-2 text-xs select-none p-2">
        {commands.map((subGroup, i) => {
          return (
            <li key={`sub_group_${i}`}>
              <ul className="flex flex-col gap-2 text-xs select-none p-2">
                {subGroup.map(({ name, keys, tooltip }, j) => (
                  <li
                    key={`${name}_${j}`}
                    className="flex justify-between"
                  >
                    <span className="mr-12">{name}</span>

                    <ul className="flex items-center gap-1" title={tooltip}>
                      {keys.map((key, y) => (
                        <li
                          key={`key_${name}_${y}`}
                          className="block w-6 p-1 leading-none text-center rounded-sm bg-slate-600 pointer-events-none"
                        >
                          {key}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
