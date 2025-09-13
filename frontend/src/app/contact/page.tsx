'use client';

export default function ContactPage() {

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert("Gracias por tu mensaje. Nos pondremos en contacto contigo pronto (simulación).");
        // Aquí se podría añadir una llamada a una API para enviar el email
        (e.target as HTMLFormElement).reset();
    };

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="max-w-2xl mx-auto text-center">
                <h1 className="text-4xl font-bold">Contacto y Soporte Técnico</h1>
                <p className="text-gray-400 mt-4">¿Tienes alguna pregunta o necesitas ayuda con un producto? Rellena el formulario y te responderemos lo antes posible.</p>
            </div>

            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mt-12 bg-foreground p-8 rounded-lg shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Nombre</label>
                        <input type="text" id="name" name="name" required className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-electric-blue" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                        <input type="email" id="email" name="email" required className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-electric-blue" />
                    </div>
                </div>
                <div className="mt-6">
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">Asunto</label>
                    <input type="text" id="subject" name="subject" required className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-electric-blue" />
                </div>
                <div className="mt-6">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Mensaje</label>
                    <textarea id="message" name="message" rows={5} required className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-electric-blue"></textarea>
                </div>
                <div className="mt-8 text-center">
                    <button type="submit" className="bg-electric-blue text-black font-bold py-3 px-8 rounded-lg hover:bg-white transition-colors">
                        Enviar Mensaje
                    </button>
                </div>
            </form>
        </div>
    );
}
