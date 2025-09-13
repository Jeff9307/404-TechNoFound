const Footer = () => {
  return (
    <footer className="bg-foreground border-t border-gray-800 mt-20">
      <div className="container mx-auto py-6 px-4">
        <div className="flex justify-between items-center">
          <p className="text-gray-400">&copy; {new Date().getFullYear()} 404 TECH NO FOUND. Todos los derechos reservados.</p>
          <div className="flex space-x-4">
            {/* Reemplazar con enlaces reales */}
            <a href="#" className="text-gray-400 hover:text-white">Twitter</a>
            <a href="#" className="text-gray-400 hover:text-white">GitHub</a>
            <a href="#" className="text-gray-400 hover:text-white">Discord</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
