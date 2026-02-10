export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white">
      {/* Barre de progression fine en haut de l'écran */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-gray-100 overflow-hidden">
        <div className="h-full bg-black w-full animate-progress origin-left" />
      </div>

      {/* Indicateur central minimaliste */}
      <div className="space-y-4 flex flex-col items-center">
        <div className="relative">
          {/* Un cercle discret qui pulse */}
          <div className="h-10 w-10 border-[1px] border-gray-200 rounded-full" />
          <div className="absolute inset-0 h-10 w-10 border-t-[1px] border-black rounded-full animate-spin" />
        </div>

        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground animate-pulse">
          Loading Studio
        </p>
      </div>
    </div>
  );
}
