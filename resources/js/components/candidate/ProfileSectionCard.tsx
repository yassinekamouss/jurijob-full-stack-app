import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface Props {
  title: string;
  icon: LucideIcon;
  children: ReactNode;
  footer?: ReactNode;
  delay?: number;
}

export default function ProfileSectionCard({ title, icon: Icon, children, footer, delay = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="group rounded-3xl border border-[#1a1f1e]/10 bg-white p-8 shadow-sm transition-all hover:shadow-md hover:border-[#1a1f1e]/20"
    >
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1a1f1e]/5 text-[#1a1f1e] transition-colors group-hover:bg-[#1a1f1e] group-hover:text-white">
            <Icon className="h-5 w-5" />
          </div>
          <h2 className="text-2xl font-bold font-serif italic text-[#1a1f1e] tracking-tight">{title}</h2>
        </div>
      </div>

      <div className="relative">
        {children}
      </div>

      {footer && (
        <div className="mt-8 pt-6 border-t border-[#1a1f1e]/5">
          {footer}
        </div>
      )}
    </motion.div>
  );
}
