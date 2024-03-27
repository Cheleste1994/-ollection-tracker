class DASHBOARD {
  private root = '/admin';

  HOME = '/';
  COLLECTIONS = `/collections`;
  SETTINGS = `/settings`;
  USERS = `/users`
  AUTH = '/auth'

  ADMIN_PANEL = `${this.root}/panel`;
}

export const DASHBOARD_PAGES = new DASHBOARD();
