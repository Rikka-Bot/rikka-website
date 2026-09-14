export async function logout(event) {
  event.preventDefault();
  try {
    const response = await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
    // A full navigation drops the in-memory AuthContext after server-side logout.
    // eslint-disable-next-line @next/next/no-location-assign-relative-destination
    if (response.ok) window.location.assign('/?logged_out=true');
    else window.alert('Não foi possível sair. Tente novamente.');
  } catch {
    window.alert('Não foi possível sair. Tente novamente.');
  }
}
