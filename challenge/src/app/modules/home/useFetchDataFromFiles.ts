import { useEffect, useState } from "react";
import Papa from "papaparse";


interface FileData {
  file: string;
  name: string;
}

export default function useFetchDataFromFiles(files: FileData[]) {
  const initialState = files.reduce(
    (acc: { [x: string]: any[] }, { name }: any) => {
      acc[name] = [];
      return acc;
    },
    {}
  );

  const [data, setData] = useState(initialState);

  useEffect(() => {
    const fetchData = async (
      file: RequestInfo | URL,
      setDataCallback: { (parsedData: any): void; (arg0: unknown[]): void }
    ) => {
      try {
        const response = await fetch(file);
        const text = await response.text();
        const results = Papa.parse(text, { header: true });
        const parsedData = results.data;
        setDataCallback(parsedData);
      } catch (error) {
        console.error(`Error retrieving ${file}:`, error);
      }
    };

    files.forEach(({ file, name }) =>
      fetchData(file, (parsedData: any) =>
        setData((prevData: any) => ({ ...prevData, [name]: parsedData }))
      )
    );
  }, [files]);

  return data;
}
