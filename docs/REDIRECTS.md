# URL Redirects Required

All redirects should be **301 (permanent)** to ensure search engines update their indexes.

## CAET-Advanced Redirects

| Source URL | Destination URL | Type |
|-----------|----------------|------|
| `www.aea.net/caetadvanced` | `www.aea.net/CAET-Advanced` | 301 |
| `www.aea.net/caet-advanced` | `www.aea.net/CAET-Advanced` | 301 |

## Implementation

### IIS (if AEA uses IIS / web.config)
```xml
<rule name="CAET-Advanced Redirect 1" stopProcessing="true">
    <match url="^caetadvanced$" ignoreCase="true" />
    <action type="Redirect" url="/CAET-Advanced" redirectType="Permanent" />
</rule>
<rule name="CAET-Advanced Redirect 2" stopProcessing="true">
    <match url="^caet-advanced$" ignoreCase="true" />
    <action type="Redirect" url="/CAET-Advanced" redirectType="Permanent" />
</rule>
```

### Apache (.htaccess)
```apache
RewriteEngine On
RewriteRule ^caetadvanced$ /CAET-Advanced [R=301,L,NC]
RewriteRule ^caet-advanced$ /CAET-Advanced [R=301,L,NC]
```

### Nginx
```nginx
location ~* ^/caetadvanced$ {
    return 301 /CAET-Advanced;
}
location ~* ^/caet-advanced$ {
    return 301 /CAET-Advanced;
}
```

**Note:** The AEA site appears to use ASP (`.asp` extensions throughout). The IIS/web.config approach is most likely the right one. Confirm with the IT team.
