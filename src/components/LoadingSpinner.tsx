import { useRouter } from "@tanstack/react-router";

export const LoadingSpinner = () => {
  const router = useRouter();
  const isPending = router.state.status === 'pending';

  if (!isPending) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-50/80 backdrop-blur-sm">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
  );
}; 