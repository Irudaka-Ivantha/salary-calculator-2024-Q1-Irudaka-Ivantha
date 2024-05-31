import React, { useState, useEffect } from 'react';

const SectionItem = ({ id, title, amount, isEpfEtf, onChange, onDelete, isStatic }) => {
  const [itemTitle, setItemTitle] = useState(title || '');
  const [value, setValue] = useState(amount || '');
  const [checked, setChecked] = useState(isEpfEtf || false);

  useEffect(() => {
    if (!isStatic) {
      onChange(id, itemTitle, value, checked);
    }
  }, [itemTitle, value, checked]);

  const handleTitleChange = (e) => {
    setItemTitle(e.target.value);
  };

  const handleAmountChange = (e) => {
    setValue(e.target.value);
  };

  const handleCheckboxChange = (e) => {
    setChecked(e.target.checked);
    onChange(id, itemTitle, value, e.target.checked);
  };

  const handleDeleteClick = () => {
    onDelete(id);
  };

  return (
    <div className="w-full flex items-center gap-4 mb-4">
      <input
        type="text"
        className="w-1/3 px-4 py-2 bg-white rounded border border-neutral-200 text-base"
        value={itemTitle}
        onChange={handleTitleChange}
        placeholder="Enter title"
        disabled={isStatic}
      />
      <input
        type="text"
        className="w-1/3 px-4 py-2 bg-white rounded border border-neutral-200 text-base"
        value={value}
        onChange={handleAmountChange}
        placeholder="Enter amount"
        disabled={isStatic}
      />
      {!isStatic && (
        <>
          <button
            type="button"
            className="text-black rounded-full bg-neutral-200 shadow-md px-2"
            onClick={handleDeleteClick}
          >
            X
          </button>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={checked}
              onChange={handleCheckboxChange}
            />
            <span>EPF/ETF</span>
          </label>
        </>
      )}
    </div>
  );
};

export default SectionItem;
