const Footer = () => {
  return (
    <footer className="mt-16 bg-(--amazon-navy) text-zinc-200">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-4">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-white">About</h3>
          <ul className="mt-3 space-y-2 text-xs">
            <li>Company</li>
            <li>Careers</li>
            <li>Press</li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-white">Help</h3>
          <ul className="mt-3 space-y-2 text-xs">
            <li>Customer Service</li>
            <li>Returns</li>
            <li>Shipping</li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-white">Business</h3>
          <ul className="mt-3 space-y-2 text-xs">
            <li>Sell on Amazon</li>
            <li>Affiliates</li>
            <li>Gift Cards</li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-white">Let Us Help You</h3>
          <ul className="mt-3 space-y-2 text-xs">
            <li>Account</li>
            <li>Orders</li>
            <li>Security</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
