type Stat = {
  label: string;
};

const stats: Stat[] = [
  { label: "Accompagnement personnalisé" },
  { label: "Solutions adaptées à vos outils" },
  { label: "Processus clair" },
  { label: "Formation à la livraison" },
];

export function AnimatedStats() {
  return (
    <section className="section-frame py-24 md:py-28">
      <div className="content-align">
        <div className="reveal-up text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">Ce que vous pouvez attendre</p>
          <h2 className="mt-5 text-4xl font-extrabold text-transparent bg-gradient-to-r from-cyan-300 to-violet-300 bg-clip-text md:text-5xl lg:text-6xl">
            Un cadre simple et concret
          </h2>
        </div>

        <div className="mx-auto mt-16 grid gap-5 md:grid-cols-4">
          {stats.map((stat, idx) => (
            <article
              key={stat.label}
              className={[
                "reveal-up rounded-2xl border border-white/10 bg-white/5 p-6 text-center shadow-sm",
                idx === 1 ? "reveal-delay-1" : "",
                idx === 2 ? "reveal-delay-2" : "",
                idx === 3 ? "reveal-delay-3" : "",
              ].join(" ")}
            >
              <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-cyan-300/60 animate-pulse" />
              <p className="text-xl font-bold tracking-tight text-white md:text-2xl">{stat.label}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}