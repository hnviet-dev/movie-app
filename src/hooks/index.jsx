import { useEffect, useState } from "react";

export default function useFetch({ url, method = "GET", token }) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  useEffect(() => {
    let isMounted = true;
    const fetchAPI = async () => {
      setIsLoading(true);
      const respone = await fetch(url, {
        method,
        // headers: {
        //   accept: "application/json",
        //   // 'content-type':'application/json',
        //   ...headers,
        // },
        headers: {
          accept: "application/json",
          // 'content-type':'application/json',
          Authorization: `Bearer ${token} `,
        },
      });
      const data = await respone.json();
      if (isMounted) {
        setData(data); // Lưu dữ liệu vào state
      }

      setIsLoading(false);

      isMounted = false; // Dọn dẹp khi component unmount
    };
    fetchAPI();
  }, [url, method, token]);
  //FIXME: Khi mà theo dõi object  hay mảng trong useEffect thì nó  luôn luôn bị  load
  //  lại liên tục . Vì sao? vì objectt và mảng nó sẽ so sánh bằng địa chỉ, mà mỗi lần thay đổi địa chỉ thì sẽ render lại, vì mặc định lần đầu
  // lúc nào cũng bị render để load mà, mà khi render 1 lần thay đổi rồi, thì nó sẽ thay địa chỉ mà thay địa chỉ lại bị vòng lăpọ như cũ, nên nó mãi mãi bị vậy
  return {
    data,
    isLoading,
  };
}
