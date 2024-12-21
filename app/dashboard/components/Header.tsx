'use client';

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => (
  <header className="bg-white shadow-md px-6 py-4">
    <h1 className="text-2xl font-bold">{title}</h1>
  </header>
);

export default Header;
