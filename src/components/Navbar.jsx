import Image from "next/image";
import Link from "next/link";


const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-5">
      <div>
        <Link className="text-xl font-bold text-indigo-500" href={'/'}>IdeaVault</Link>
      </div>
      <ul className="flex gap-3">
        <li><Link href={'/'}>Home</Link></li>
        <li><Link href={'/Ideas'}>Ideas</Link ></li>
        <li><Link href={'/Add Idea'}>Add Idea</Link ></li>
        <li><Link href={'/My Ideas'}>My Ideas</Link ></li>
        <li><Link href={'/My Interactions'}>My Interactions</Link ></li>
      </ul>
      <ul className="flex gap-3">
        <li><Link href={'/Login'}>Login</Link></li>
        <li><Link href={'/Register'}>Register</Link ></li>
        <li><Link href={'/User Profile'}>User Profile</Link ></li>
      </ul>
    </nav>

  );
};

export default Navbar;