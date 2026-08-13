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
      className="group rounded-2xl sm:rounded-3xl border border-[#1a1f1e]/10 bg-white p-5 sm:p-8 shadow-sm transition-all hover:shadow-md hover:border-[#1a1f1e]/20"
    >
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-[#1a1f1e]/5 text-[#1a1f1e] transition-colors group-hover:bg-[#1a1f1e] group-hover:text-white shrink-0">
            <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-serif italic text-[#1a1f1e] tracking-tight">{title}</h2>
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
