export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] bg-dark flex flex-col items-center justify-center">
      <div className="w-12 h-12 border-2 border-gold/20 border-t-gold rounded-full animate-spin mb-6" />
      <p className="font-oswald text-sm uppercase tracking-[0.2em] text-[#A0A0A0]">
        Carregando showroom...
      </p>
    </div>
  );
}
