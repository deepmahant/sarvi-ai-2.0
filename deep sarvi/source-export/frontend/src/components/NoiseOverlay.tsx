export default function NoiseOverlay() {
  return (
    <div
      id="noise-overlay-container"
      className="fixed inset-0 pointer-events-none opacity-[0.035] mix-blend-overlay z-50 transform-gpu will-change-transform"
      style={{
        transform: 'translateZ(0)',
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      }}
    />
  );
}

