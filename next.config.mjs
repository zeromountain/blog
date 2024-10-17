const isDev = process.argv.includes("dev");
const isBuild = process.argv.includes("build");

if (!process.env.VELITE_STARTED && (isDev || isBuild)) {
  process.env.VELITE_STARTED = '1';
  
  const { build } = await import('velite');
  await build({
    watch: isDev,
    clean: !isDev,
  });
}

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;
