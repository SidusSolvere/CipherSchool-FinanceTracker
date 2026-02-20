import { useRef, useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { FaLongArrowAltUp, FaLongArrowAltDown } from "react-icons/fa";
import GlassSurface from "@/components/GlassSurface";


function ColumnSearch({ value, onChange, placeholder }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <span className="relative ml-1" ref={ref}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
        className="
          p-1 rounded-full
          text-white/70
          hover:text-white
          hover:bg-white/10
          transition
        "
      >
        <FiSearch size={14} />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-2 z-30">
          <GlassSurface
            borderRadius={16}
            className="
              p-2
              bg-white/10
              backdrop-blur-md
              border border-white/20
              hover:border-white/80
            "
          >
            <input
              autoFocus
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              className="
                w-40
                bg-transparent
                outline-none
                text-white
                placeholder:text-white/50
                text-sm
              "
            />
          </GlassSurface>
        </div>
      )}
    </span>
  );
}

function TransactionHeader({
  sortField,
  sortDirection,
  onSort,
  filters,
  onFilterChange,
}) {
  const columns = [
    { key: "Amount", label: "Amount" },
    { key: "Type", label: "Type" },
    { key: "ToFrom", label: "To / From" },
    { key: "TransactionId", label: "Txn ID" },
    { key: "Date", label: "Date" },
  ];

  const renderArrow = (key) => {
    if (sortField !== key) return null;

    return sortDirection === "asc" ? (
      <FaLongArrowAltUp className="inline ml-1 text-white" />
    ) : (
      <FaLongArrowAltDown className="inline ml-1 text-white" />
    );
  };

  return (<div className="w-full">
  <GlassSurface
  style={{
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 0,
  }}
    className="
      w-full
      h-12
      p-2 sm:p-8
      border border-white/20
      hover:border-white/80
      flex items-center
      justify-between
      gap-6
      flex-wrap
      rounded-t-2xl rounded-b-none 
"      
  >
    {columns.map((col) => (
      <div
        key={col.key}
        className="
          flex items-center gap-1
          min-w-[140px]
          flex-1
        "
      >
        {col.key === "Type" ? (
          <select
            value={filters.type}
            onChange={(e) =>
              onFilterChange({ ...filters, type: e.target.value })
            }
            onClick={(e) => e.stopPropagation()}
            className="bg-transparent text-white font-semibold outline-none"
          >
            <option value="ALL" className="text-black">
              Type
            </option>
            <option value="Debit" className="text-black">
              Debit
            </option>
            <option value="Credit" className="text-black">
              Credit
            </option>
          </select>
        ) : (
          <button
            onClick={() => onSort(col.key)}
            className="flex items-center font-semibold text-white/70 hover:text-white"
          >
            {col.label}
            {renderArrow(col.key)}
          </button>
        )}

        {col.key === "ToFrom" && (
          <ColumnSearch
            value={filters.toFrom}
            placeholder="Search To / From"
            onChange={(val) =>
              onFilterChange({ ...filters, toFrom: val })
            }
          />
        )}

        {col.key === "TransactionId" && (
          <ColumnSearch
            value={filters.transactionId}
            placeholder="Transaction ID"
            onChange={(val) =>
              onFilterChange({ ...filters, transactionId: val })
            }
          />
        )}
      </div>
    ))}
  </GlassSurface>
</div>
  );
}

export default TransactionHeader;
