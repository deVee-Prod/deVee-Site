// Minimal client-side router using History API
type RouteChangeListener = (path: string) => void;

class Router {
  private listeners: Set<RouteChangeListener> = new Set();

  constructor() {
    // Listen to browser back/forward
    window.addEventListener('popstate', () => {
      this.notifyListeners();
    });
  }

  getCurrentPath(): string {
    return window.location.pathname;
  }

  navigate(path: string, replace = false): void {
    if (replace) {
      window.history.replaceState({}, '', path);
    } else {
      window.history.pushState({}, '', path);
    }
    this.notifyListeners();
  }

  subscribe(listener: RouteChangeListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notifyListeners(): void {
    const path = this.getCurrentPath();
    this.listeners.forEach(listener => listener(path));
  }
}

export const router = new Router();

// Link component helper
export function navigateTo(path: string, event?: React.MouseEvent): void {
  if (event) {
    event.preventDefault();
  }
  router.navigate(path);
}
