import { useRouter } from "@tanstack/react-router";

export const ErrorBoundary = () => {
  const router = useRouter();
  const error = router.state.matches[0]?.error as Error;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Oops!</h2>
          <p className="mt-2 text-sm text-gray-600">
            Something went wrong. Please try again later.
          </p>
          <div className="mt-4 p-4 bg-red-50 rounded-md">
            <p className="text-sm text-red-700">{error?.message || 'An unknown error occurred'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}; 