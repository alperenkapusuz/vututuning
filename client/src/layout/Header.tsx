import React from "react";

const Header = () => {
  return (
    <header className="sticky top-0 border-b-4">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              VUTUTUNING
            </h1>
          </div>

          <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
            {/* Kayıt olma butonları gelecek */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
