import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppFab from '../marketing/WhatsAppFab';
import AIChatbotWidget from '../chat/AIChatbotWidget';

export default function PageLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFab />
      <AIChatbotWidget />
    </div>
  );
}
