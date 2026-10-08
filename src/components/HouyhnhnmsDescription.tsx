function readStory(description: string) {
  const [intro, synopsis, protagonists, support, production] = description.split('\n\n');
  const [heading, ...lines] = protagonists.split('\n');
  return {
    intro, synopsis, heading: heading.replace(/:$/, ''), support,
    heroes: lines.map(line => {
      const separator = line.indexOf(' — ');
      return { role: line.slice(2, separator), detail: line.slice(separator + 3) };
    }),
    dates: production.split('\n').map(line => {
      const separator = line.indexOf(': ');
      return { label: line.slice(0, separator), value: line.slice(separator + 2) };
    }),
  };
}

type Story = ReturnType<typeof readStory>;

export function HouyhnhnmsDescription({ description }: { description: string }) {
  const story: Story = readStory(description);
  return (
    <div className="text-pretty">
      <p className="mb-8 max-w-2xl text-balance text-[23px] font-light leading-snug text-gray-100 md:text-[28px]">{story.intro}</p>
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_224px] lg:gap-9">
        <div className="min-w-0">
          <p className="mb-8 text-lg font-light leading-relaxed text-gray-300">{story.synopsis}</p>
          <h3 className="mb-4 font-mono text-xs tracking-wide text-red-400">{story.heading}</h3>
          <ul className="space-y-4 text-base font-light leading-relaxed text-gray-300">
            {story.heroes.map(hero => (
              <li key={hero.role}><strong className="font-medium text-gray-100">{hero.role}</strong>{' — '}{hero.detail}</li>
            ))}
          </ul>
        </div>
        <aside className="min-w-0 space-y-6 border-t border-gray-700/50 pt-6 lg:border-t-0 lg:border-l lg:pt-1 lg:pl-6">
          <dl className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1 lg:gap-6">
            {story.dates.map(date => (
              <div key={date.label}>
                <dt className="mb-2 font-mono text-[11px] leading-relaxed text-red-400">{date.label}</dt>
                <dd className="text-sm leading-relaxed text-gray-200">{date.value}</dd>
              </div>
            ))}
          </dl>
          <p className="text-sm leading-relaxed text-gray-400">{story.support}</p>
        </aside>
      </div>
    </div>
  );
}
