import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-8">
        {/* Company Information */}
        <div>
          <h4 className="text-xl font-bold mb-4">DocuVerify</h4>
          <p>
            Revolutionizing document verification with cutting-edge AI and blockchain technology.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xl font-bold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/features" className="hover:underline">
                Features
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:underline">
                About Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        <div>
          <h4 className="text-xl font-bold mb-4">Connect</h4>
          <div className="space-y-2">
            <p>Email: <Link href="mailto:support@docuverify.com" className="hover:underline">support@docuverify.com</Link></p>
            <p>Phone: <Link href="tel:+15551234567" className="hover:underline">+1 (555) 123-4567</Link></p>
          </div>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="text-center mt-8 border-t border-gray-800 pt-4">
        © 2024 DocuVerify. All Rights Reserved.
      </div>
    </footer>
  );
}
