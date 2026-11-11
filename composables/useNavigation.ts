export const useNavigation = () => {
    const menuItems = ref([
      { name: 'Home', path: '/', routeName: 'index' },
      { name: 'About', path: '/about', routeName: 'about' },
      { name: 'Events', path: '/events', routeName: 'events' },
      { name: 'Contact', path: '/contact', routeName: 'contact' }
    ])
  
    return {
      menuItems
    }
  }