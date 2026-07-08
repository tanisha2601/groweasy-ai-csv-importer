"use client";

import { motion } from "framer-motion";
import CountUp from "react-countup";
import {
  CheckCircle2,
  XCircle,
  Target,
  Sparkles,
} from "lucide-react";

type StatsCardsProps = {
  imported: number;
  skipped: number;
};

export default function StatsCards({
  imported,
  skipped,
}: StatsCardsProps) {
  const successRate =
    imported + skipped === 0
      ? 0
      : Math.round((imported / (imported + skipped)) * 100);

  const cards = [
    {
      title: "Imported Records",
      value: imported,
      suffix: "",
      color: "text-emerald-400",
      border: "border-emerald-500/20",
      bg: "from-emerald-500/10 to-transparent",
      icon: CheckCircle2,
    },
    {
      title: "Skipped Records",
      value: skipped,
      suffix: "",
      color: "text-red-400",
      border: "border-red-500/20",
      bg: "from-red-500/10 to-transparent",
      icon: XCircle,
    },
    {
      title: "Success Rate",
      value: successRate,
      suffix: "%",
      color: "text-cyan-400",
      border: "border-cyan-500/20",
      bg: "from-cyan-500/10 to-transparent",
      icon: Target,
    },
    {
      title: "AI Processed",
      value: imported,
      suffix: "",
      color: "text-yellow-400",
      border: "border-yellow-500/20",
      bg: "from-yellow-500/10 to-transparent",
      icon: Sparkles,
    },
  ];

  return (
    <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.1,
              duration: 0.4,
            }}
            whileHover={{
              y: -6,
              scale: 1.02,
            }}
            className={`relative overflow-hidden rounded-3xl border ${card.border} bg-slate-900/70 p-6 shadow-xl backdrop-blur transition-all duration-300`}
          >
            {/* Gradient Background */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${card.bg} pointer-events-none`}
            />

            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">
                  {card.title}
                </p>

                <h2 className={`mt-3 text-4xl font-black ${card.color}`}>
                  <CountUp
                    end={card.value}
                    duration={1.8}
                    separator=","
                  />
                  {card.suffix}
                </h2>
              </div>

              <div className="rounded-2xl bg-white/5 p-3">
                <Icon className={`h-8 w-8 ${card.color}`} />
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}