
export default function LegendMenu({ title, commands }) {
  return (
    <div className="border border-dashed border-slate-700">
      <h2 className="p-2 font-semibold text-white border-b border-dashed border-slate-700">{title}</h2>
      <ul className="flex flex-col gap-2 select-none">
        {commands.map((subGroup, i) => {
          return (
            <li key={`sub_group_${i}`}>
              <ul className="flex flex-col gap-2 text-sm select-none p-2">
                {subGroup.map(({ name, keys, tooltip }, j) => (
                  <li
                    key={`${name}_${j}`}
                    className="flex justify-between"
                  >
                    <span className="mr-12">{name}</span>

                    <ul className="flex items-center gap-1" title={tooltip}>
                      {keys.map((key, y) => {
                        if (key === '›' || key === '+') {
                          return (
                            <li
                              key={`key_${name}_${y}`}
                              className="block text-lg py-1 leading-none text-center pointer-events-none text-slate-600"
                            >
                              {key}
                            </li>
                          )
                        }

                        return (
                          <li
                            key={`key_${name}_${y}`}
                            className="block min-w-[24px] p-1 leading-none text-center rounded-sm bg-slate-800 pointer-events-none text-slate-300"
                          >
                            {key}
                          </li>
                        )
                      })}
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
