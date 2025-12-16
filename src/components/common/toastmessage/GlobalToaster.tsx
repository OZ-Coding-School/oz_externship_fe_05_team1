import { Toaster } from 'react-hot-toast'

const GlobalToaster = () => (
  <Toaster
    position="top-right"
    reverseOrder={false}
    gutter={8}
    containerStyle={{
      top: 20,
      right: 20,
    }}
    toastOptions={{
      duration: 4000,
      style: {
        padding: '0',
        background: 'transparent',
        boxShadow: 'none',
      },
    }}
  />
)

export default GlobalToaster
