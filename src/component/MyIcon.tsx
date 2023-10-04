const icons = {
  email: '📧',
  phone: '📞',
  good: '✅',
  warning: '❗',
  vegetable: '🥕',
  order: '🗒️',
};

type IconName = keyof typeof icons;

interface IconProps {
  name: IconName;
}

export function MyIcon({ name }: IconProps) {
  return <>{icons[name]}</>;
}
