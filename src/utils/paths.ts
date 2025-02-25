/**
 * Module with path helpers to work around path alias issues in development
 */

// Helper function to replace @ import paths with relative paths at runtime
export function resolveModulePath(path: string): string {
  // Replace @ import paths with relative paths
  if (path.startsWith('@/')) {
    return path.replace('@/', '../');
  }
  return path;
}

export default {
  resolveModulePath
};