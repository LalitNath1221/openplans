import { APP_STORE_URL, PLAY_STORE_URL } from '@/lib/site';
import { Icon } from './icons';

// `!` is needed where unlayered site CSS (`a`, `.icon`, `:focus-visible`) would beat Tailwind's layered utilities.
const btn =
  'inline-flex items-center gap-[9px] min-h-14 min-w-0 px-3 py-2 rounded-2xl! bg-(--text) text-white! ' +
  'shadow-[0_10px_24px_rgba(26,29,46,0.18)] transition-[translate,box-shadow] duration-200 ease-[ease] ' +
  'hover:-translate-y-0.5 hover:shadow-[0_16px_30px_rgba(26,29,46,0.24)] ' +
  'sm:gap-3 sm:min-h-[60px] sm:min-w-[186px] sm:py-2.5 sm:pl-[18px] sm:pr-[22px] sm:rounded-(--r-md)!';
const icon = 'size-[22px]! sm:size-[26px]!';
const label = 'grid leading-[1.15]';
const small = 'text-[10px] sm:text-[11px] font-semibold opacity-80';
const strong = 'text-base sm:text-[19px] font-extrabold';

export function StoreButtons() {
  return (
    <>
      <a className={btn} href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer">
        <Icon name="play" className={icon} />
        <span className={label}><small className={small}>GET IT ON</small><strong className={strong}>Google Play</strong></span>
      </a>
      <a className={btn} href={APP_STORE_URL} target="_blank" rel="noopener noreferrer">
        <Icon name="apple" className={icon} />
        <span className={label}><small className={small}>Download on the</small><strong className={strong}>App Store</strong></span>
      </a>
    </>
  );
}
