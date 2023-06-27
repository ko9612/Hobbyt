export default function ParseDateFC(date: string) {
  return new Date(date).toLocaleDateString("ko-KR");
}
