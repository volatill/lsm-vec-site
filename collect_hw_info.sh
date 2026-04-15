#!/bin/bash
# Collect server hardware info for benchmark reporting
# Usage: bash collect_hw_info.sh > server_info.txt

echo "=== CPU ==="
lscpu 2>/dev/null | grep -E "^(Model name|Socket|Core|Thread|CPU\(s\)|CPU MHz|CPU max)" || \
  sysctl -a 2>/dev/null | grep -E "machdep.cpu\.(brand|core_count|thread_count)" || \
  cat /proc/cpuinfo 2>/dev/null | grep -E "^(model name|cpu cores|siblings)" | sort -u

echo ""
echo "=== Memory ==="
free -h 2>/dev/null | head -2 || \
  sysctl hw.memsize 2>/dev/null | awk '{printf "Total: %.0f GB\n", $2/1024/1024/1024}'

echo ""
echo "=== Disk ==="
lsblk -d -o NAME,MODEL,SIZE,ROTA,TYPE 2>/dev/null | head -10 || \
  df -h / | head -2

echo ""
echo "=== OS ==="
uname -sr
cat /etc/os-release 2>/dev/null | grep -E "^(PRETTY_NAME|VERSION)" || true
