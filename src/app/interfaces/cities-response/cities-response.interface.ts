import { CitiesList } from "../../types/cities-list";
import { IBaseCountriesResponse } from "../base-countries-response.interface";

export interface CitiesResponse extends IBaseCountriesResponse {
  data: CitiesList;
}
