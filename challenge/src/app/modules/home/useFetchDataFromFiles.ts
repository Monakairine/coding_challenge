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
  const [isLoading, setIsLoading] = useState(true);

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

    const fetchDataFromAllFiles = async () => {
      try {
        for (const { file, name } of files) {
          await fetchData(file, (parsedData: any) =>
            setData((prevData: any) => ({ ...prevData, [name]: parsedData }))
          );
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchDataFromAllFiles();
  }, [files]);

  return { data, isLoading };
}
