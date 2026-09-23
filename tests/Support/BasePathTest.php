<?php
declare(strict_types=1);

namespace HelpdeskForm\Tests\Support;

use PHPUnit\Framework\TestCase;
use HelpdeskForm\Support\BasePath;

class BasePathTest extends TestCase
{
    protected function tearDown(): void
    {
        unset($_ENV['BASE_PATH']);
    }

    public function testNormalizesToLeadingSlashWithoutTrailingSlash(): void
    {
        $this->assertSame('', BasePath::normalize(''));
        $this->assertSame('', BasePath::normalize('/'));
        $this->assertSame('/portal', BasePath::normalize('portal'));
        $this->assertSame('/portal', BasePath::normalize('/portal/'));
        $this->assertSame('/support/portal', BasePath::normalize(' /support/portal/ '));
    }

    public function testUrlAtDomainRoot(): void
    {
        $this->assertSame('/', BasePath::url('/'));
        $this->assertSame('/auth/login?error=x', BasePath::url('/auth/login?error=x'));
    }

    public function testUrlUnderSubpath(): void
    {
        $_ENV['BASE_PATH'] = '/portal/';
        $this->assertSame('/portal/', BasePath::url('/'));
        $this->assertSame('/portal/auth/login', BasePath::url('/auth/login'));
    }

    public function testStripUnderSubpath(): void
    {
        $_ENV['BASE_PATH'] = '/portal';
        $this->assertSame('/', BasePath::strip('/portal'));
        $this->assertSame('/', BasePath::strip('/portal/'));
        $this->assertSame('/auth/login', BasePath::strip('/portal/auth/login'));
        // Already-stripped paths (proxy removed the prefix) pass through
        $this->assertSame('/auth/login', BasePath::strip('/auth/login'));
        // A sibling path that merely shares the prefix is not stripped
        $this->assertSame('/portal-admin/x', BasePath::strip('/portal-admin/x'));
    }

    public function testStripAtDomainRootIsNoop(): void
    {
        $this->assertSame('/', BasePath::strip('/'));
        $this->assertSame('/portal/x', BasePath::strip('/portal/x'));
    }
}
