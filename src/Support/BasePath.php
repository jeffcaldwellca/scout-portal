<?php
declare(strict_types=1);

namespace HelpdeskForm\Support;

/**
 * URL prefix the portal is served under, from the BASE_PATH env var
 * (e.g. "/portal" when hosted at https://example.com/portal).
 * Empty when the portal is served from the domain root.
 */
final class BasePath
{
    /** Normalized base path: '' or '/segment' (leading slash, no trailing slash). */
    public static function get(): string
    {
        return self::normalize((string)($_ENV['BASE_PATH'] ?? ''));
    }

    public static function normalize(string $path): string
    {
        $path = trim(trim($path), '/');
        return $path === '' ? '' : '/' . $path;
    }

    /** Prefix an app path such as '/auth/login' with the base path. */
    public static function url(string $path): string
    {
        return self::get() . '/' . ltrim($path, '/');
    }

    /**
     * Remove the base path from a request path so routes and middleware see
     * app paths ('/portal/auth/login' -> '/auth/login'). Paths that don't
     * carry the prefix (a proxy already stripped it) are returned unchanged.
     */
    public static function strip(string $path): string
    {
        $base = self::get();
        if ($base !== '' && ($path === $base || str_starts_with($path, $base . '/'))) {
            $path = substr($path, strlen($base));
        }
        return $path === '' ? '/' : $path;
    }
}
