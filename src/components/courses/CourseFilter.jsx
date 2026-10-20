export default function CourseFilter({ categories, active, onChange }) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <button
        type="button"
        onClick={() => onChange('all')}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
          active === 'all' ? 'bg-indigo-600 text-white' : 'glass text-slate-300 hover:text-white'
        }`}
      >
        All
      </button>
      {categories.map((c) => (
        <button
          key={c}
          type="button"
          onClick={() => onChange(c)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all capitalize ${
            active === c ? 'bg-indigo-600 text-white' : 'glass text-slate-300 hover:text-white'
          }`}
        >
          {c}
        </button>
      ))}
    </div>
  );
}
