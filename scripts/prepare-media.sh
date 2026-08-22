#!/usr/bin/env sh
set -eu

project_root=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
source_video=${ROOMBA_VIDEO_SOURCE:-/home/arbi/Work/roomba/docs/roomba-simulation-demo.mp4}
asset_dir="$project_root/public/assets"

if [ ! -f "$source_video" ]; then
  printf 'Roomba source video not found: %s\n' "$source_video" >&2
  exit 1
fi

mkdir -p "$asset_dir"

ffmpeg -hide_banner -loglevel warning -y \
  -ss 60 -i "$source_video" -frames:v 1 \
  -vf "scale=1280:-2:flags=lanczos" \
  -c:v libwebp -quality 82 \
  "$asset_dir/roomba-simulation-poster.webp"

ffmpeg -hide_banner -loglevel warning -y \
  -i "$source_video" -an \
  -vf "scale=1280:-2:flags=lanczos,fps=24" \
  -c:v libx264 -preset slow -crf 27 -pix_fmt yuv420p \
  -movflags +faststart \
  "$asset_dir/roomba-simulation-demo.web.mp4"

printf 'Prepared media:\n'
du -h "$asset_dir/roomba-simulation-poster.webp" "$asset_dir/roomba-simulation-demo.web.mp4"
