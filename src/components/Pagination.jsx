export default function Pagination({
  currentPage = 1,
  totalItems = 0,
  pageSize = 5,
  onPageChange
}) {
  const totalPages = Math.ceil(totalItems / pageSize) || 1
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1
  const endItem = Math.min(currentPage * pageSize, totalItems)

  return (
    <div className="px-5 py-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 bg-white rounded-b-2xl">
      <div>
        Menampilkan <span className="font-semibold text-slate-700">{startItem}</span> sampai{' '}
        <span className="font-semibold text-slate-700">{endItem}</span> dari{' '}
        <span className="font-semibold text-slate-700">{totalItems}</span> data
      </div>

      {totalPages > 1 && (
        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1 transition"
          >
            &lt; Sebelumnya
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              type="button"
              onClick={() => onPageChange(pageNum)}
              className={`w-8 h-8 rounded-lg text-xs font-bold transition cursor-pointer ${
                currentPage === pageNum
                  ? 'bg-[var(--color-primary)] text-white shadow-xs'
                  : 'border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {pageNum}
            </button>
          ))}

          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1 transition"
          >
            Selanjutnya &gt;
          </button>
        </div>
      )}
    </div>
  )
}
