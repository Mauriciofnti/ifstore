import { ref } from 'vue'

export function useDarkMode() {
  // Inicializar o estado imediatamente com base no localStorage
  const savedTheme = localStorage.getItem('darkMode')
  const isDarkMode = ref(savedTheme === 'enabled')

  // Aplicar a classe 'dark' ao body imediatamente
  if (isDarkMode.value) {
    document.body.classList.add('dark')
  } else {
    document.body.classList.remove('dark')
  }

  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value
    document.body.classList.toggle('dark', isDarkMode.value)
    localStorage.setItem('darkMode', isDarkMode.value ? 'enabled' : 'disabled')
  }

  return { isDarkMode, toggleDarkMode }
}