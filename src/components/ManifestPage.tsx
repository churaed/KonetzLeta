import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { LanguageSwitcher } from './LanguageSwitcher';

function FadeBlock({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
    >
      {children}
    </motion.div>
  );
}

function PartHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-24 md:mt-32 mb-12 md:mb-16 first:mt-0">
      <div className="flex items-center gap-4 mb-6">
        <span className="h-px flex-1 bg-gradient-to-r from-red-400/60 to-transparent" />
      </div>
      <h2 className="text-4xl md:text-6xl font-cormorant italic text-white leading-tight">
        {children}
      </h2>
    </div>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-2xl md:text-3xl font-cormorant italic text-red-400 mt-12 md:mt-16 mb-5 md:mb-6">
      {children}
    </h3>
  );
}

function MinorHeading({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="text-xl md:text-2xl font-cormorant italic text-white mt-10 md:mt-12 mb-4">
      {children}
    </h4>
  );
}

function Quote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="border-l-2 border-red-400 pl-5 md:pl-8 my-6 md:my-8 text-gray-100 font-cormorant italic text-lg md:text-2xl leading-relaxed">
      {children}
    </blockquote>
  );
}

function Para({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`text-gray-300 font-mono text-sm md:text-base leading-relaxed ${className}`}>
      {children}
    </p>
  );
}

function ParaList({ items }: { items: string[] }) {
  return (
    <ul className="my-4 space-y-2 pl-1">
      {items.map((line, i) => (
        <li
          key={i}
          className="relative pl-5 text-gray-300 font-mono text-sm md:text-base leading-relaxed before:content-['·'] before:absolute before:left-0 before:text-red-400 before:font-bold before:text-base before:top-0.5"
        >
          {line}
        </li>
      ))}
    </ul>
  );
}

function FinalCTA() {
  const { t } = useTranslation();
  return (
    <div className="mt-20 md:mt-24 text-center">
      <Link
        to="/"
        className="inline-block px-8 py-3 bg-red-500 hover:bg-red-600 text-white font-mono text-sm tracking-wide rounded-full transition-colors duration-200"
      >
        {t('manifest_page.back_home')}
      </Link>
    </div>
  );
}

export function ManifestPage() {
  const { t } = useTranslation();

  const list = (key: string): string[] =>
    t(key, { returnObjects: true }) as string[];

  return (
    <div className="min-h-screen bg-black text-white">
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=JetBrains+Mono:wght@300;400;500&display=swap"
        rel="stylesheet"
      />

      <article className="max-w-2xl mx-auto px-5 sm:px-8 py-16 md:py-24">
        <div className="flex justify-end mb-8">
          <LanguageSwitcher />
        </div>
        <FadeBlock>
          <header className="text-center space-y-5 mb-20 md:mb-28">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-cormorant italic text-white leading-[1.1]">
              {t('manifest_page.title')}
            </h1>
            <div className="space-y-1 text-xs md:text-sm font-mono text-gray-400 tracking-wider">
              <p>{t('manifest_page.version')}</p>
              <p>{t('manifest_page.date')}</p>
              <p>{t('manifest_page.founder')}</p>
            </div>
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-red-400 to-transparent mx-auto mt-6" />
          </header>
        </FadeBlock>

        <PartHeading>{t('manifest_page.part1.heading')}</PartHeading>

        <FadeBlock>
          <SubHeading>{t('manifest_page.part1.why_exists.title')}</SubHeading>
          <div className="space-y-4">
            <Para>{t('manifest_page.part1.why_exists.p1')}</Para>
            <Para>{t('manifest_page.part1.why_exists.p2')}</Para>
            <Para>{t('manifest_page.part1.why_exists.p3')}</Para>
            <Para>{t('manifest_page.part1.why_exists.p4')}</Para>
            <Para>{t('manifest_page.part1.why_exists.p5')}</Para>
            <Para>{t('manifest_page.part1.why_exists.p6')}</Para>
          </div>
        </FadeBlock>

        <FadeBlock>
          <SubHeading>{t('manifest_page.part1.good_film.title')}</SubHeading>
          <div className="space-y-4">
            <Para>{t('manifest_page.part1.good_film.intro')}</Para>
            <Para>{t('manifest_page.part1.good_film.intro2')}</Para>
            <Para className="text-gray-200">{t('manifest_page.part1.good_film.lead')}</Para>
            <ParaList items={list('manifest_page.part1.good_film.traits')} />
            <Para>{t('manifest_page.part1.good_film.outro')}</Para>
            <Para>{t('manifest_page.part1.good_film.outro2')}</Para>
          </div>
        </FadeBlock>

        <FadeBlock>
          <SubHeading>{t('manifest_page.part1.what_is.title')}</SubHeading>
          <div className="space-y-4">
            <Para>{t('manifest_page.part1.what_is.p1')}</Para>
            <Para>{t('manifest_page.part1.what_is.p2')}</Para>
            <Para>{t('manifest_page.part1.what_is.p3')}</Para>
            <ParaList items={list('manifest_page.part1.what_is.traits')} />
          </div>
        </FadeBlock>

        <FadeBlock>
          <SubHeading>{t('manifest_page.part1.values.title')}</SubHeading>
          <div className="space-y-4">
            <Para>{t('manifest_page.part1.values.lead')}</Para>
            <ParaList items={list('manifest_page.part1.values.items')} />
            <Para className="pt-2">{t('manifest_page.part1.values.middle')}</Para>
            <p className="text-xl md:text-2xl font-cormorant italic text-red-400 py-2">
              {t('manifest_page.part1.values.fun')}
            </p>
            <Para>{t('manifest_page.part1.values.fun_explained')}</Para>
            <Para>{t('manifest_page.part1.values.fun_p1')}</Para>
            <Para>{t('manifest_page.part1.values.fun_p2')}</Para>
            <Para>{t('manifest_page.part1.values.fun_p3')}</Para>
            <Para>{t('manifest_page.part1.values.fun_p4')}</Para>
            <Para>{t('manifest_page.part1.values.fun_p5')}</Para>
          </div>
        </FadeBlock>

        <FadeBlock>
          <SubHeading>{t('manifest_page.part1.mistakes.title')}</SubHeading>
          <ParaList items={list('manifest_page.part1.mistakes.items')} />
        </FadeBlock>

        <FadeBlock>
          <SubHeading>{t('manifest_page.part1.money.title')}</SubHeading>
          <ParaList items={list('manifest_page.part1.money.items')} />
        </FadeBlock>

        <FadeBlock>
          <SubHeading>{t('manifest_page.part1.responsibility.title')}</SubHeading>
          <div className="space-y-4">
            <Para className="text-gray-200">{t('manifest_page.part1.responsibility.p1')}</Para>
            <Para>{t('manifest_page.part1.responsibility.p2')}</Para>
            <Para className="text-gray-200">{t('manifest_page.part1.responsibility.p3')}</Para>
            <ParaList items={list('manifest_page.part1.responsibility.items')} />
          </div>
        </FadeBlock>

        <FadeBlock>
          <SubHeading>{t('manifest_page.part1.we_want.title')}</SubHeading>
          <ParaList items={list('manifest_page.part1.we_want.items')} />
        </FadeBlock>

        <PartHeading>{t('manifest_page.part2.heading')}</PartHeading>

        <FadeBlock>
          <SubHeading>{t('manifest_page.part2.management.title')}</SubHeading>
          <ParaList items={list('manifest_page.part2.management.items')} />
        </FadeBlock>

        <FadeBlock>
          <SubHeading>{t('manifest_page.part2.bodies.title')}</SubHeading>
        </FadeBlock>

        <FadeBlock>
          <MinorHeading>{t('manifest_page.part2.bodies.founder.title')}</MinorHeading>
          <div className="space-y-3">
            <Para>{t('manifest_page.part2.bodies.founder.p1')}</Para>
            <Para>{t('manifest_page.part2.bodies.founder.p2')}</Para>
          </div>
        </FadeBlock>

        <FadeBlock>
          <MinorHeading>{t('manifest_page.part2.bodies.art_director.title')}</MinorHeading>
          <div className="space-y-3">
            <Para>{t('manifest_page.part2.bodies.art_director.lead')}</Para>
            <ParaList items={list('manifest_page.part2.bodies.art_director.items')} />
            <Para>{t('manifest_page.part2.bodies.art_director.outro')}</Para>
          </div>
        </FadeBlock>

        <FadeBlock>
          <MinorHeading>{t('manifest_page.part2.bodies.art_collegium.title')}</MinorHeading>
          <div className="space-y-3">
            <Para>{t('manifest_page.part2.bodies.art_collegium.lead')}</Para>
            <ParaList items={list('manifest_page.part2.bodies.art_collegium.members')} />
            <Para>{t('manifest_page.part2.bodies.art_collegium.p1')}</Para>
            <Para>{t('manifest_page.part2.bodies.art_collegium.she')}</Para>
            <ParaList items={list('manifest_page.part2.bodies.art_collegium.items')} />
            <Para>{t('manifest_page.part2.bodies.art_collegium.outro')}</Para>
          </div>
        </FadeBlock>

        <FadeBlock>
          <MinorHeading>{t('manifest_page.part2.bodies.studio_council.title')}</MinorHeading>
          <div className="space-y-3">
            <Para>{t('manifest_page.part2.bodies.studio_council.lead')}</Para>
            <ParaList items={list('manifest_page.part2.bodies.studio_council.members')} />
            <Para>{t('manifest_page.part2.bodies.studio_council.outro')}</Para>
          </div>
        </FadeBlock>

        <FadeBlock>
          <MinorHeading>{t('manifest_page.part2.bodies.coo.title')}</MinorHeading>
          <div className="space-y-3">
            <Para>{t('manifest_page.part2.bodies.coo.lead')}</Para>
            <Para>{t('manifest_page.part2.bodies.coo.lead2')}</Para>
            <Para>{t('manifest_page.part2.bodies.coo.lead3')}</Para>
            <Para className="pt-2">{t('manifest_page.part2.bodies.coo.responsibilities_lead')}</Para>
            <ParaList items={list('manifest_page.part2.bodies.coo.items')} />
          </div>
        </FadeBlock>

        <FadeBlock>
          <SubHeading>{t('manifest_page.part2.directions.title')}</SubHeading>
        </FadeBlock>

        <FadeBlock>
          <MinorHeading>{t('manifest_page.part2.directions.art_films.title')}</MinorHeading>
          <Para>{t('manifest_page.part2.directions.art_films.p1')}</Para>
        </FadeBlock>

        <FadeBlock>
          <MinorHeading>{t('manifest_page.part2.directions.commission.title')}</MinorHeading>
          <Para>{t('manifest_page.part2.directions.commission.p1')}</Para>
        </FadeBlock>

        <FadeBlock>
          <MinorHeading>{t('manifest_page.part2.directions.blue_fence.title')}</MinorHeading>
          <div className="space-y-3">
            <Para>{t('manifest_page.part2.directions.blue_fence.p1')}</Para>
            <Para>{t('manifest_page.part2.directions.blue_fence.p2')}</Para>
            <ParaList items={list('manifest_page.part2.directions.blue_fence.items')} />
          </div>
        </FadeBlock>

        <FadeBlock>
          <SubHeading>{t('manifest_page.part2.teams.title')}</SubHeading>
          <ParaList items={list('manifest_page.part2.teams.items')} />
        </FadeBlock>

        <FadeBlock>
          <SubHeading>{t('manifest_page.part2.how_accepted.title')}</SubHeading>
          <div className="space-y-3">
            <Para>{t('manifest_page.part2.how_accepted.p1')}</Para>
            <Quote>{t('manifest_page.part2.how_accepted.q1')}</Quote>
            <Quote>{t('manifest_page.part2.how_accepted.q2')}</Quote>
            <Para>{t('manifest_page.part2.how_accepted.p2')}</Para>
            <Para>{t('manifest_page.part2.how_accepted.p3')}</Para>
          </div>
        </FadeBlock>

        <PartHeading>{t('manifest_page.part3.heading')}</PartHeading>

        <FadeBlock>
          <SubHeading>{t('manifest_page.part3.iterations.title')}</SubHeading>
          <ParaList items={list('manifest_page.part3.iterations.items')} />
        </FadeBlock>

        <FadeBlock>
          <SubHeading>{t('manifest_page.part3.three_principles.title')}</SubHeading>
          <ParaList items={list('manifest_page.part3.three_principles.items')} />
        </FadeBlock>

        <FadeBlock>
          <SubHeading>{t('manifest_page.part3.five_values.title')}</SubHeading>
          <ParaList items={list('manifest_page.part3.five_values.items')} />
        </FadeBlock>

        <FadeBlock>
          <SubHeading>{t('manifest_page.part3.feedback.title')}</SubHeading>
          <div className="space-y-3">
            <Para className="text-gray-200">{t('manifest_page.part3.feedback.praise_lead')}</Para>
            <Para>{t('manifest_page.part3.feedback.praise')}</Para>
            <Para className="text-gray-200">{t('manifest_page.part3.feedback.crit_lead')}</Para>
            <Para>{t('manifest_page.part3.feedback.crit')}</Para>
          </div>
        </FadeBlock>

        <FadeBlock>
          <SubHeading>{t('manifest_page.part3.clarify.title')}</SubHeading>
          <div className="space-y-3">
            <Para>{t('manifest_page.part3.clarify.p1')}</Para>
            <Para>{t('manifest_page.part3.clarify.p2')}</Para>
            <ParaList items={list('manifest_page.part3.clarify.items')} />
          </div>
        </FadeBlock>

        <FadeBlock>
          <SubHeading>{t('manifest_page.part3.trust.title')}</SubHeading>
          <ParaList items={list('manifest_page.part3.trust.items')} />
        </FadeBlock>

        <FadeBlock>
          <SubHeading>{t('manifest_page.part3.openness.title')}</SubHeading>
          <div className="space-y-3">
            <Para>{t('manifest_page.part3.openness.lead')}</Para>
            <ParaList items={list('manifest_page.part3.openness.items')} />
            <Para>{t('manifest_page.part3.openness.outro')}</Para>
          </div>
        </FadeBlock>

        <FadeBlock>
          <SubHeading>{t('manifest_page.part3.buffer.title')}</SubHeading>
          <div className="space-y-3">
            <Para>{t('manifest_page.part3.buffer.p1')}</Para>
            <Para>{t('manifest_page.part3.buffer.p2')}</Para>
            <Para>{t('manifest_page.part3.buffer.p3')}</Para>
            <Para>{t('manifest_page.part3.buffer.p4')}</Para>
            <Para>{t('manifest_page.part3.buffer.p5')}</Para>
            <Para>{t('manifest_page.part3.buffer.p6')}</Para>
            <Para>{t('manifest_page.part3.buffer.p7')}</Para>
          </div>
        </FadeBlock>

        <FadeBlock>
          <SubHeading>{t('manifest_page.part3.learn.title')}</SubHeading>
          <div className="space-y-3">
            <Para>{t('manifest_page.part3.learn.p1')}</Para>
            <Para>{t('manifest_page.part3.learn.p2')}</Para>
            <Para>{t('manifest_page.part3.learn.p3')}</Para>
          </div>
        </FadeBlock>

        <PartHeading>{t('manifest_page.final.title')}</PartHeading>

        <FadeBlock>
          <div className="space-y-5">
            <Para>{t('manifest_page.final.p1')}</Para>
            <Quote>{t('manifest_page.final.quote1')}</Quote>
            <Para>{t('manifest_page.final.p2')}</Para>
            <Quote>{t('manifest_page.final.quote2')}</Quote>
            <Para>{t('manifest_page.final.p3')}</Para>
          </div>
        </FadeBlock>

        <FadeBlock>
          <FinalCTA />
        </FadeBlock>
      </article>
    </div>
  );
}
