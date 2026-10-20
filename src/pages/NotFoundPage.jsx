import Container from '../components/ui/Container';
import Button from '../components/ui/Button';

export default function NotFoundPage() {
  return (
    <Container className="py-32 text-center">
      <h1 className="font-heading text-6xl font-bold text-gradient mb-4">404</h1>
      <p className="text-slate-400 mb-8">Page not found</p>
      <Button to="/">Go Home</Button>
    </Container>
  );
}
