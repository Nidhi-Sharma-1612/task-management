export default function Footer() {
  return (
    <footer className="w-full bg-blue-600 text-white py-4 mt-8 shadow-md">
      <div className="container mx-auto text-center">
        <p className="text-sm sm:text-base">
          © {new Date().getFullYear()} Task Manager. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
